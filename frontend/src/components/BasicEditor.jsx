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
    // MARK_CODE,
    createParagraphPlugin,
    createBlockquotePlugin,
    createCodeBlockPlugin,
    createHeadingPlugin,
    createAlignPlugin,
    createBasicMarksPlugin,
    createFontColorPlugin,
    createFontBackgroundColorPlugin,
    createFontSizePlugin,
    // createCodePlugin,
    createPlugins,
    createPlateUI,
    HeadingToolbar,
} from "@udecode/plate";
import BasicEditorToolbar from "./BasicEditorToolbar";
import AlignToolbarButtons from "./AlignToolbarButtons";
import BasicMarkToolbarButtons from "./BasicMarkToolbarButtons";
import FontToolbarButtons from "./FontToolbarButtons";

const editableProps = {
    placeholder: "내용을 입력해 주세요…",
    style: {
        padding: "15px",
    },
};

const BasicEditor = ({ selectedDate }) => {
    

    const initVal = () => {
        const str = localStorage.getItem(selectedDate);
        return JSON.parse(str);
    };

    

    const plugins = createPlugins(
        [
            // elements
            createParagraphPlugin(), // paragraph element
            createBlockquotePlugin(), // blockquote element
            createCodeBlockPlugin(), // code block element
            createHeadingPlugin(), // heading elements

            // marks
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
                initialValue={initVal()}
                plugins={plugins}
            >
                <HeadingToolbar
                    styles={{
                        root: {
                            position: "sticky",
                            backgroundColor: "#fafafa",
                            zIndex: 4,
                            width: "100%",
                            paddingLeft: "0",
                            paddingRight: "0",
                            marginLeft: "0",
                        },
                    }}
                >
                    <BasicEditorToolbar />

                </HeadingToolbar>
            </Plate>
        </>
    );
};

export default BasicEditor;
