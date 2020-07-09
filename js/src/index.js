/**
 * Internal dependencies
 */
import RadioTermSelector from './radio-term-selector';

function CustomizeTaxonomySelector( OriginalComponent ) {
  return function( props ) {
    // props.slug is the taxonomy (slug)
    if (RB4T_userinfo.isAdministrator) {
      var term_id = Number(RB4T_userinfo.term_id);

      if (props.terms.indexOf(term_id) === -1) {
        props.terms.push(term_id);
      }

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

wp.hooks.addFilter(
  'editor.PostTaxonomyType',
  'RB4T',
  CustomizeTaxonomySelector
);
