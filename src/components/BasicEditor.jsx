import React from "react";
import {
    Plate,
    ELEMENT_PARAGRAPH,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_CODE_BLOCK,
    ELEMENT_CODE_LINE,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_UNDERLINE,
    MARK_STRIKETHROUGH,
    MARK_CODE,
    createParagraphPlugin,
    createBlockquotePlugin,
    createCodeBlockPlugin,
    createHeadingPlugin,
    createBoldPlugin,
    createItalicPlugin,
    createUnderlinePlugin,
    createStrikethroughPlugin,
    createCodePlugin,
    createPlugins,
    createPlateUI,
} from "@udecode/plate";

const editableProps = {
    placeholder: "Type…",
    style: {
        padding: "15px",
    },
};

const BasicEditor = () => {
    // Not important, quick helper to create a block element with (marked) text
    const createElement = (text, { type = ELEMENT_PARAGRAPH, mark } = {}) => {
        const leaf = { text };
        if (mark) {
            leaf[mark] = true;
        }

        return {
            type,
            children: [leaf],
        };
    };

    // Initial value, stored in VALUES.basicNodes
    const initialValue = [
        createElement("🧱 기본 Plate 에디터에요!", { type: ELEMENT_H1 }),
        createElement("🔥 사용하기 어렵다면 그냥 textField 써도 됩니다", {
            type: ELEMENT_H2,
        }),
        createElement("요 아래는 블록들을 여러종류 써놓았습니다."),
        createElement("Heading 1", { type: ELEMENT_H1 }),
        createElement("Heading 2", { type: ELEMENT_H2 }),
        createElement("Heading 3", { type: ELEMENT_H3 }),
        createElement("Heading 4", { type: ELEMENT_H4 }),
        createElement("Heading 5", { type: ELEMENT_H5 }),
        createElement("Heading 6", { type: ELEMENT_H6 }),
        createElement("Blockquote", { type: ELEMENT_BLOCKQUOTE }),
        {
            type: ELEMENT_CODE_BLOCK,
            children: [
                {
                    type: ELEMENT_CODE_LINE,
                    children: [
                        {
                            text: "const a = 'Hello';",
                        },
                    ],
                },
                {
                    type: ELEMENT_CODE_LINE,
                    children: [
                        {
                            text: "const b = 'World';",
                        },
                    ],
                },
            ],
        },
        createElement("💅 표시하기", { type: ELEMENT_H1 }),
        createElement("💧 기본 마킹", { type: ELEMENT_H2 }),
        createElement(
            "The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code."
        ),
        createElement(
            "You can customize the type, the component and the hotkey for each of these."
        ),
        createElement("This text is bold.", { mark: MARK_BOLD }),
        createElement("This text is italic.", { mark: MARK_ITALIC }),
        createElement("This text is underlined.", {
            mark: MARK_UNDERLINE,
        }),
        {
            type: ELEMENT_PARAGRAPH,
            children: [
                {
                    text: "This text is bold, italic and underlined.",
                    [MARK_BOLD]: true,
                    [MARK_ITALIC]: true,
                    [MARK_UNDERLINE]: true,
                },
            ],
        },
        createElement("This is a strikethrough text.", {
            mark: MARK_STRIKETHROUGH,
        }),
        createElement("This is an inline code.", { mark: MARK_CODE }),
    ];

    const plugins = createPlugins(
        [
            // elements
            createParagraphPlugin(), // paragraph element
            createBlockquotePlugin(), // blockquote element
            createCodeBlockPlugin(), // code block element
            createHeadingPlugin(), // heading elements

            // marks
            createBoldPlugin(), // bold mark
            createItalicPlugin(), // italic mark
            createUnderlinePlugin(), // underline mark
            createStrikethroughPlugin(), // strikethrough mark
            createCodePlugin(), // code mark
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
                initialValue={initialValue}
                plugins={plugins}
            />
        </>
    );
};

export default BasicEditor;
