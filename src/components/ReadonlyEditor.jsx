import React from "react";
import {
    Plate,
    createParagraphPlugin,
    createBlockquotePlugin,
    createCodeBlockPlugin,
    createHeadingPlugin,
    createPlugins,
    createPlateUI,
    createAlignPlugin,
    createBasicMarksPlugin,
    createFontColorPlugin,
    createFontBackgroundColorPlugin,
    ELEMENT_PARAGRAPH,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
} from "@udecode/plate";

const editableProps = {
    placeholder: "Type…",
    style: {
        padding: 15,
        backgroundColor: "white",
        marginTop: 15,
    },
};

const ReadonlyEditor = ({ selectedDate, isDataContent }) => {
    // const initVal = () => {
    //     console.log(selectedDate);
    //     const str = );
    //     return JSON.parse(str);
    // };

    // const initialValue = [
    //     createElement("🧱 기본 Plate 에디터에요!", { type: ELEMENT_H1 }),
    //     createElement("🔥 사용하기 어렵다면 그냥 textField 써도 됩니다", {
    //         type: ELEMENT_H2,
    //     }),
    //     createElement("요 아래는 블록들을 여러종류 써놓았습니다."),
    //     createElement("Heading 1", { type: ELEMENT_H1 }),
    //     createElement("Heading 2", { type: ELEMENT_H2 }),
    //     createElement("Heading 3", { type: ELEMENT_H3 }),
    //     createElement("Heading 4", { type: ELEMENT_H4 }),
    //     createElement("Heading 5", { type: ELEMENT_H5 }),
    //     createElement("Heading 6", { type: ELEMENT_H6 }),
    //     createElement("Blockquote", { type: ELEMENT_BLOCKQUOTE }),
    // {
    //     type: ELEMENT_CODE_BLOCK,
    //     children: [
    //         {
    //             type: ELEMENT_CODE_LINE,
    //             children: [
    //                 {
    //                     text: "const a = 'Hello';",
    //                 },
    //             ],
    //         },
    //         {
    //             type: ELEMENT_CODE_LINE,
    //             children: [
    //                 {
    //                     text: "const b = 'World';",
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // createElement("💅 표시하기", { type: ELEMENT_H1 }),
    // createElement("💧 기본 마킹", { type: ELEMENT_H2 }),
    // createElement(
    //     "The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code."
    // ),
    // createElement(
    //     "You can customize the type, the component and the hotkey for each of these."
    // ),
    // createElement("This text is bold.", { mark: MARK_BOLD }),
    // createElement("This text is italic.", { mark: MARK_ITALIC }),
    // createElement("This text is underlined.", {
    //     mark: MARK_UNDERLINE,
    // }),
    // {
    //     type: ELEMENT_PARAGRAPH,
    //     children: [
    //         {
    //             text: "This text is bold, italic and underlined.",
    //             [MARK_BOLD]: true,
    //             [MARK_ITALIC]: true,
    //             [MARK_UNDERLINE]: true,
    //         },
    //     ],
    // },
    // createElement("This is a strikethrough text.", {
    //     mark: MARK_STRIKETHROUGH,
    // }),
    // createElement("This is an inline code.", { mark: MARK_CODE }),
    // ];

    const plugins = createPlugins(
        [
            // elements
            createParagraphPlugin(), // paragraph element
            createBlockquotePlugin(), // blockquote element
            createCodeBlockPlugin(), // code block element
            createHeadingPlugin(), // heading elements

            // marks
            // createBoldPlugin(), // bold mark
            // createItalicPlugin(), // italic mark
            // createUnderlinePlugin(), // underline mark
            // createStrikethroughPlugin(), // strikethrough mark
            // createCodePlugin(), // code mark
            createAlignPlugin({
                inject: {
                    props: {
                        validTypes: [
                            ELEMENT_PARAGRAPH,
                            ELEMENT_H1,
                            ELEMENT_H2,
                            ELEMENT_H3,
                            ELEMENT_H4,
                            ELEMENT_H5,
                            ELEMENT_H6,
                        ],
                    },
                },
            }),
            createBasicMarksPlugin(), // 진하게 등등
            createFontColorPlugin(),
            createFontBackgroundColorPlugin(),
        ],
        {
            components: createPlateUI(),
        }
    );

    return (
        <>
            <Plate
                id="1"
                editableProps={editableProps}
                value={
                    isDataContent
                        ? JSON.parse(selectedDate)
                        : JSON.parse(localStorage.getItem(selectedDate))
                }
                plugins={plugins}
            ></Plate>
        </>
    );
};

export default ReadonlyEditor;
