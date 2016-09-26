import React from 'react';
import DragDropLayout, {
  Row, Column , Text, Title, generateEmptyLayout
} from 'react-dnd-layout';
import comps from '../../../catalog';

const EditorContent = ({ page, update, pages }) => (
  <DragDropLayout
    items={page.items}
    info={{
      pages
    }}
    rootId="root"
    components={comps}
    onChange={update(page.path)} />
);

export default EditorContent;
