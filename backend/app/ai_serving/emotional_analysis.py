from flask.json import jsonify
import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm import tqdm, tqdm_notebook
from collections import Counter
from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model
from transformers import AdamW
from transformers.optimization import get_cosine_schedule_with_warmup
import re


device = torch.device("cpu")
bertmodel, vocab = get_pytorch_kobert_model()


class BERTDataset(Dataset):
    def __init__(
        self, dataset, sent_idx, label_idx, bert_tokenizer, max_len, pad, pair
    ):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair
        )

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return self.sentences[i] + (self.labels[i],)

    def __len__(self):
        return len(self.labels)


class BERTClassifier(nn.Module):
    def __init__(self, bert, hidden_size=768, num_classes=2, dr_rate=None, params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size, num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(
            input_ids=token_ids,
            token_type_ids=segment_ids.long(),
            attention_mask=attention_mask.float().to(token_ids.device),
        )
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)


max_len = 64
batch_size = 64
# 토큰화
tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)


emotion_model = torch.load(
    "ai_serving/emotion_model.pt", map_location=torch.device("cpu")
)
slang_model = torch.load("ai_serving/slang_model.pt", map_location=torch.device("cpu"))


def emotion_predict(predict_sentence):  # 감정분석
    emotions = list()
    data = [predict_sentence, "0"]
    dataset_another = [data]
    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(
        another_test, batch_size=batch_size, num_workers=0
    )  # 토큰화하는 과정에 필요

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(
        test_dataloader
    ):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)
        valid_length = valid_length
        label = label.long().to(device)
        out = emotion_model(token_ids, valid_length, segment_ids)

        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()

            emotions = []

            if np.argmax(logits) == 0:
                emotions = "공포"
            elif np.argmax(logits) == 1:
                emotions = "놀람"
            elif np.argmax(logits) == 2:
                emotions = "분노"
            elif np.argmax(logits) == 3:
                emotions = "슬픔"
            elif np.argmax(logits) == 4:
                emotions = "중립"
            elif np.argmax(logits) == 5:
                emotions = "행복"
            elif np.argmax(logits) == 6:
                emotions = "혐오"

            return emotions


def slang_predict(predict_sentence):  # 폭언 욕설 분석
    data = [predict_sentence, "0"]
    dataset_another = [data]
    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(
        another_test, batch_size=batch_size, num_workers=0
    )

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(
        test_dataloader
    ):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)
        valid_length = valid_length
        label = label.long().to(device)
        out = slang_model(token_ids, valid_length, segment_ids)

        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()
            if np.argmax(logits) == 0:  # 일반
                result = False
                break
            elif np.argmax(logits) == 1:  # 비방&욕설
                result = True
        return result


def pre_processing(raw_text):  # 정규표현식 & split 함수
    regex = re.compile("[^ .가-힣+]")
    result = regex.sub("", raw_text)
    devided_sentence = result.split(". ")  # 마침표 + 띄어쓰기 기준

    return list(devided_sentence)


def emotion_analysis(per_sentence):
    slang = slang_predict(per_sentence)  # 폭언욕설분석
    emo_list = []
    sentence = pre_processing(per_sentence)  # 전처리
    for i in range(len(sentence)):
        if sentence[i] != "":
            emo_list.append(emotion_predict(sentence[i]))  # 감정분석
        else:
            pass
    max_item = Counter(emo_list).most_common(n=1)
    return max_item, slang


# 테스트
# max_item : 가장 많이 나온 감정과 그 감정의 수,  slang : 비방/욕설의 유 무

# emotion_analysis(
#     "오랜만에 일기를 쓴다! 8월동안은 7월과는 다르게 밖에도 많이 나가고 재밌는 일을 많이 했다. 가장 잘한건 상상 유니브 등록해서 수업 나간 일! 너무 재미있다. 처음 배워온 날 너무 재미있어서 밤새 그리고 2주 넘게 아직까지도 하는 중ㅎㅎ 엽서도 일러스트로 그려서 가져갈 예정이다."
# )
