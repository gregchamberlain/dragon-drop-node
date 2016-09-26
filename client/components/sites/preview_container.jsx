import { connect } from 'react-redux';
import SitePreview from './preview.jsx';
import { map } from '../../util/entity_utils.js';
import { parsePageId } from '../../util/router_utils.js';
import { push } from 'react-router-redux';

const mapStateToProps = ({ loading, pages, components, sites }, { params, location }) => ({
  site: sites[params.siteId],
  siteId: params.siteId,
  loading: loading['site'],
  page: pages[parsePageId(params)],
  components: map(pages[parsePageId(params)], 'components', components),
  back: location.query.back
});

const mapDispatchToProps = (dispatch, { location }) => ({
  goBack: back => dispatch(push(back))
});

export default connect(mapStateToProps, mapDispatchToProps)(SitePreview);
