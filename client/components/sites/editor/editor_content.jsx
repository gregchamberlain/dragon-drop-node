import React from 'react';
import DragDropLayout, {
  Row, Column , Text, Title, generateEmptyLayout
} from 'react-dnd-layout';

const comps = {Row, Column, Text, Title};

const EditorContent = ({ page, update }) => (
  <DragDropLayout
    items={page.items}
    rootId="root"
    components={comps}
    onChange={update(page.path)} />
);

export default EditorContent;
