import React from "react";
import {
    Plate,
    createParagraphPlugin,
    createBlockquotePlugin,
    createHeadingPlugin,
    createPlugins,
    createPlateUI,
} from "@udecode/plate";

const editableProps = {
    placeholder: "Type…",
    style: {
        padding: 15,
        backgroundColor: "white",
        marginTop: 15,
    },
    readOnly: true,
};

const ReadonlyEditor = ({
    selectedDate,
    isDataContent,
    id,
    disablePlugins,
}) => {
    const plugins = createPlugins(
        [
            // elements
            createParagraphPlugin(), // paragraph element
            createBlockquotePlugin(), // blockquote element
            createHeadingPlugin(), // heading elements
        ],
        {
            components: createPlateUI(),
        }
    );

    return (
        <>
            <Plate
                id={id ?? "1"}
                editableProps={editableProps}
                value={
                    isDataContent
                        ? JSON.parse(selectedDate)
                        : JSON.parse(localStorage.getItem(selectedDate))
                }
                plugins={disablePlugins ? undefined : plugins}
            ></Plate>
        </>
    );
};

export default ReadonlyEditor;
