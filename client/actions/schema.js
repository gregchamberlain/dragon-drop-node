import { normalize, Schema, arrayOf } from 'normalizr';

export const site = new Schema('sites', {
  idAttribute: 'identifier',
  assignEntity: (output, key, value, input) => {
    // output.id = output._id;
    // console.log(output);
    // delete output._id;
  }
});

export const arrayOfSites = arrayOf(site);

export const template = new Schema('templates');
export const arrayOfTemplates = arrayOf(template);

const pageId = entity => `${entity.siteId}${entity.path}`;

export const page = new Schema('pages', { idAttribute: pageId });
export const arrayOfPages = arrayOf(page);

export const component = new Schema('components');
export const arrayOfComponents = arrayOf(component);

export const view = new Schema('views');
export const arrayOfViews = arrayOf(view);

page.define({
  components: arrayOfComponents,
  // views: arrayOfViews,
});

site.define({
  pages: arrayOfPages,
  // views: arrayOfViews,
});

template.define({
  pages: arrayOfPages
});
