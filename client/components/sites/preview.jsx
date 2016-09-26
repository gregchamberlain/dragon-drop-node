import React, { Component, PropTypes } from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import LoadingPage from '../ui/loading_page.jsx';
import _ from 'lodash';
import Catalog from '../../catalog';
const Grid = WidthProvider(ReactGridLayout);
import ArrowDown from 'react-icons/lib/fa/arrow-down';
import Back from 'react-icons/lib/fa/arrow-left';
import DragDropLayout, {
  RootLayout, Row, Column, Title, Link, Image, Text
} from 'react-dnd-layout';

const comps = {Row, Column, Text, Title};

class SitePreview extends Component {

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
        { back ? (
          <div className="preview-overlay">
            <div className="item action" onClick={goBack}>
              <Back />
            </div>
          <div className="item">Preview</div>
          </div>
        ) : ""}
        <div style={{position: 'relative', width: '100%', flex: 1, background: '#fff'}}>
          <RootLayout
            items={page.items}
            rootId="root"
            components={comps} />
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
