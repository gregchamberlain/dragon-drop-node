import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { isEqual } from 'lodash';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import DragDropLayout, {
  RootLayout, Row, Column, Title, Link, Image, Text
} from 'react-dnd-layout';
const Grid = WidthProvider(ReactGridLayout);
import _ from 'lodash';
// import Catalog from '../../catalog';

const comps = {Row, Column, Text, Title};

// const createElement = el => {
//   let i = `${el._id}`;
//   let Comp = Catalog[el.name];
//   const layout = el.layout;
//   const props = el.props;
//   return (
//     <div key={i} data-grid={_.merge({}, layout)}>
//       <Comp {...props}/>
//     </div>
//   );
// };

// const layout = components => components.map(c => _.merge({}, c.layout));

const getUrl = (site, template, selected) => (
  template ? `/sites/${site.identifier}/editor` : {pathname: `/preview/${site.identifier}`, query: {back: selected ? '/sites/new' : '/templates'}}
);

class SitesIndexItem extends Component {

  constructor(props) {
    super(props);
    const width = 240;
    const ratio = width / window.screen.availWidth;
    this.style = {
      position: 'absolute',
      width: window.screen.availWidth,
      height: window.screen.availHeight,
      transformOrigin: '0 0 0',
      transform: `scale(${ratio})`
    };
  }

  componentDidMount() {
    const box = this.refs.box.getBoundingClientRect();
    // const width = box.right - box.left;
    // const height = box.bottom - box.top;
  }

  handleClick = e => {
    const { selected, site, router, template, onClick } = this.props;
    if (selected) {
      onClick(site);
    } else {
      router.push(getUrl(site, template, selected));
    }
  }


  render() {

    const { site, router, template, selected, onClick } = this.props;
    return (
      <div className={`site-item${ isEqual(selected, site) ? " selected" : ""}`}>
        <div className="site-wrapper">
          <div ref="box" className="sites-index-item" onClick={this.handleClick}>
            <div style={this.style}>
              <RootLayout
                items={site.rootPage.items}
                rootId="root"
                components={comps} />
            </div>
            { selected && site._id ? <button onClick={e => {e.stopPropagation(); router.push(getUrl(site, template, selected));}} className="preview-button">Preview</button> : ""}
          </div>
        </div>
        <div style={{textAlign: 'center', fontWeight: 'bold'}}>{site.name}</div>
      </div>
    );
  }
}
export default withRouter(SitesIndexItem);
