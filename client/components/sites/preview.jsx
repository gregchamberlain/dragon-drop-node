import React, { Component, PropTypes } from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import LoadingPage from '../ui/loading_page';
import _ from 'lodash';
import Catalog from '../../catalog';
const Grid = WidthProvider(ReactGridLayout);
import ArrowDown from 'react-icons/lib/fa/arrow-down';
import Back from 'react-icons/lib/fa/arrow-left';
import { RootLayout } from 'react-dnd-layout';
import comps from '../../catalog';

class SitePreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      back: props.back
    };
  }

  getChildContext = () => {
    return {
      preview: this.props.siteId,
      site: this.props.site
    };
  }

  render () {
    const { loading, siteId, site, goBack, back, page } = this.props;

    return (
      <LoadingPage loading={loading}>
        <div className="preview-overlay">
          { this.state.back ? (
            <div className="item action" onClick={() => goBack(this.state.back)}>
              <Back />
            </div>
            ) : ""}
          <div className="item">Preview</div>
        </div>
        <div style={{position: 'relative', width: '100%', flex: 1, background: '#fff'}}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RootLayout
              items={page.items}
              rootId="root"
              components={comps} />
          )}
        </div>
      </LoadingPage>
    );
  }
}

SitePreview.childContextTypes = {
  preview: PropTypes.string,
  site: PropTypes.object,
};

export default SitePreview;
