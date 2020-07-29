/**
 * Internal dependencies
 */

import RadioTermSelector from './radio-term-selector';

function CustomizeTaxonomySelector( OriginalComponent ) {
  return function( props ) {

    if (RB4Tl18n.radio_taxonomies.indexOf(props.slug) >= 0) {
      var term_id = Number(RB4T_userinfo.term_id);

      var terms = [term_id];

      if (props.terms.indexOf(term_id) === -1) {
        props.terms.push(term_id);

        // save data via ajax post.
        const { onUpdateTerms, taxonomy } = props;

        if (RB4T_userinfo.isAdministrator || RB4T_userinfo.isEditor) {
          terms = props.terms
        }

        onUpdateTerms( terms , taxonomy.rest_base );
      }
    }

    // props.slug is the taxonomy (slug)
    if (RB4T_userinfo.isAdministrator || RB4T_userinfo.isEditor) {
      return wp.element.createElement(
        OriginalComponent,
        props
      );
    } else if (RB4Tl18n.radio_taxonomies.indexOf(props.slug) >= 0) {
      return wp.element.createElement(
        RadioTermSelector,
        props
      );
    } else {
      return wp.element.createElement(
        OriginalComponent,
        props
      );
    }
	}
};

// console.log(RB4T_userinfo);

if (RB4T_userinfo && RB4T_userinfo.isPostTypeFacility) {
  wp.hooks.addFilter(
    'editor.PostTaxonomyType',
    'RB4T',
    CustomizeTaxonomySelector
  );
}

