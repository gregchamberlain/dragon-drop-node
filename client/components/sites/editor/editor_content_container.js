import { connect } from 'react-redux';
import EditorContent from './editor_content';
import { parsePageId } from '../../../util/router_utils.js';
import { map } from '../../../util/entity_utils';
import { updateItems } from '../../../actions/page_actions';

const mapStateToProps = ({ pages, sites }, { params }) => ({
  pages: map(sites[params.siteId], 'pages', pages),
  page: pages[parsePageId(params)]
});

const mapDispatchToProps = (dispatch, { params }) => ({
  update: path => items => dispatch(updateItems(`${params.siteId}${path}`, items))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorContent);
