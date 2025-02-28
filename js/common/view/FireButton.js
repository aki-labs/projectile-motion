// Copyright 2016-2022, University of Colorado Boulder

/**
 * Fire button, just a simple subtype of RectangularPushButton.
 *
 * @author Andrea Lin (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Image } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import fireButton_png from '../../../mipmaps/fireButton_png.js';
import projectileMotion from '../../projectileMotion.js';

class FireButton extends RectangularPushButton {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      baseColor: 'rgb( 255, 0, 0 )', // red
      iconWidth: 20 // width of icon, used for scaling, the aspect ratio will determine height
    }, options );

    // fire button icon
    assert && assert( !options.content, 'this type sets its own content' );
    options.content = new Image( fireButton_png );
    options.content.scale( options.iconWidth / options.content.width );

    super( options );
  }
}

projectileMotion.register( 'FireButton', FireButton );
export default FireButton;