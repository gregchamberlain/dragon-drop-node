import React from 'react';
import LayoutEditor from './layout_editor_container';
import PropsEditor from '../../Editor/Editor';
import Catalog from '../../Catalog';
import { parsePageId } from '../../../util/router_utils.js';
import DragDropLayout, { Row, Column , Text, Title, generateEmptyLayout } from 'react-dnd-layout';
import { connect } from 'react-redux';
import { updateItems } from '../../../actions/page_actions';

// const EditorContent = ({ propsEditor, catalog, params, closeCatalog }) => (
//   <div className="fill">
//     <LayoutEditor params={params} />
//     { propsEditor ? <PropsEditor /> : ""}
//     { catalog ? <Catalog params={params} /> : "" }
//   </div>
// );

const comps = {Row, Column, Text, Title};
const layout = generateEmptyLayout('root');
const EditorContent = ({ page, update }) => (
  <DragDropLayout
    a={console.log(page.path, page.items)}
    items={page.items}
    rootId="root"
    components={comps}
    onChange={update(page.path)} />
);

const mapStateToProps = ({ pages }, { params }) => ({
  page: pages[parsePageId(params)]
});

const mapDispatchToProps = (dispatch, { params }) => ({
  update: path => items => dispatch(updateItems(`${params.siteId}${path}`, items))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorContent);
