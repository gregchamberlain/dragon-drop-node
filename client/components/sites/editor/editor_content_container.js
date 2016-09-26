import { connect } from 'react-redux';
import EditorContent from './editor_content';
import { parsePageId } from '../../../util/router_utils.js';
import { updateItems } from '../../../actions/page_actions';

const mapStateToProps = ({ pages }, { params }) => ({
  page: pages[parsePageId(params)]
});

const mapDispatchToProps = (dispatch, { params }) => ({
  update: path => items => dispatch(updateItems(`${params.siteId}${path}`, items))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorContent);
