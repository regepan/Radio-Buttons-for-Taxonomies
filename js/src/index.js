/**
 * Internal dependencies
 */
import RadioTermSelector from './radio-term-selector';

function CustomizeTaxonomySelector( OriginalComponent ) {
  return function( props ) {
    var term_id = Number(RB4T_userinfo.term_id);

    if (props.terms.indexOf(term_id) === -1) {
      props.terms.push(term_id);

      // save data via ajax post.
      const { onUpdateTerms, taxonomy } = props;
      const termId = parseInt( term_id, 10 );
      onUpdateTerms( [ termId ], taxonomy.rest_base );
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

wp.hooks.addFilter(
  'editor.PostTaxonomyType',
  'RB4T',
  CustomizeTaxonomySelector
);
