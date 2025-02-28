// Copyright 2017-2021, University of Colorado Boulder

/**
 * Control panel that allows users to modify initial values for how the cannon fires a projectile.
 *
 * @author Andrea Lin (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import { HStrut } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ProjectileMotionConstants from '../../common/ProjectileMotionConstants.js';
import projectileMotion from '../../projectileMotion.js';
import projectileMotionStrings from '../../projectileMotionStrings.js';

const angleString = projectileMotionStrings.angle;
const heightString = projectileMotionStrings.height;
const initialValuesString = projectileMotionStrings.initialValues;
const metersPerSecondString = projectileMotionStrings.metersPerSecond;
const mString = projectileMotionStrings.m;
const pattern0Value1UnitsString = projectileMotionStrings.pattern0Value1Units;
const pattern0Value1UnitsWithSpaceString = projectileMotionStrings.pattern0Value1UnitsWithSpace;
const speedString = projectileMotionStrings.speed;

// constants
const TITLE_OPTIONS = ProjectileMotionConstants.PANEL_TITLE_OPTIONS;
const LABEL_OPTIONS = ProjectileMotionConstants.PANEL_LABEL_OPTIONS;
const DEGREES = MathSymbols.DEGREES;

class InitialValuesPanel extends Panel {

  /**
   * @param {Property.<number>} cannonHeightProperty - height of the cannon
   * @param {Property.<number>} cannonAngleProperty - angle of the cannon, in degrees
   * @param {Property.<number>} initialSpeedProperty - velocity of next projectile to be fired
   * @param {Object} [options]
   */
  constructor( cannonHeightProperty, cannonAngleProperty, initialSpeedProperty, options ) {

    // The first object is a placeholder so none of the others get mutated
    // The second object is the default, in the constants files
    // The third object is options specific to this panel, which overrides the defaults
    // The fourth object is options given at time of construction, which overrides all the others
    options = merge( {}, ProjectileMotionConstants.RIGHTSIDE_PANEL_OPTIONS, {
      yMargin: 5,
      tandem: Tandem.REQUIRED
    }, options );

    // Max width for all components in this panel
    const maxWidth = options.minWidth - 2 * options.xMargin;

    /**
     * Auxiliary function that creates VBox for a parameter label and slider
     * @param {string} labelString - label for the parameter
     * @param {string} unitsString - units
     * @param {Property.<number>} valueProperty - the Property that is set and linked to
     * @param {Range} range - range for the valueProperty value
     * @param {Tandem} tandem
     * @param {string} [degreeString] - just for the angle
     * @returns {VBox}
     */
    function createReadout( labelString, unitsString, valueProperty, range, tandem, degreeString ) {
      const parameterLabel = new Text( '', merge( {}, LABEL_OPTIONS, {
        maxWidth: maxWidth,

        // phet-io
        tandem: tandem,
        textPropertyOptions: { phetioReadOnly: true }
      } ) );

      valueProperty.link( value => {
        const valueReadout = degreeString ?
                             StringUtils.fillIn( pattern0Value1UnitsString, {
                               value: Utils.toFixedNumber( value, 2 ),
                               units: degreeString
                             } ) :
                             StringUtils.fillIn( pattern0Value1UnitsWithSpaceString, {
                               value: Utils.toFixedNumber( value, 2 ),
                               units: unitsString
                             } );
        parameterLabel.setText( `${labelString}: ${valueReadout}` );
      } );

      return new VBox( {
        align: 'left',
        children: [ parameterLabel, new HStrut( maxWidth ) ]
      } );
    }

    const heightReadout = createReadout(
      heightString,
      mString,
      cannonHeightProperty,
      ProjectileMotionConstants.CANNON_HEIGHT_RANGE,
      options.tandem.createTandem( 'heightReadout' )
    );

    const angleReadout = createReadout(
      angleString,
      null,
      cannonAngleProperty,
      ProjectileMotionConstants.CANNON_ANGLE_RANGE,
      options.tandem.createTandem( 'angleReadout' ),
      DEGREES
    );

    const velocityReadout = createReadout(
      speedString,
      metersPerSecondString,
      initialSpeedProperty,
      ProjectileMotionConstants.LAUNCH_VELOCITY_RANGE,
      options.tandem.createTandem( 'velocityReadout' )
    );

    // contents of the panel
    const content = new VBox( {
      align: 'left',
      spacing: options.controlsVerticalSpace / 3,
      children: [
        heightReadout,
        angleReadout,
        velocityReadout
      ]
    } );

    const initialValuesTitle = new Text( initialValuesString, _.merge( {}, TITLE_OPTIONS, {
      maxWidth: maxWidth,
      tandem: options.tandem.createTandem( 'titleNode' )
    } ) );

    const initialValuesVBox = new VBox( {
      align: 'center',
      spacing: 0,
      children: [
        initialValuesTitle,
        content
      ]
    } );

    super( initialValuesVBox, options );
  }
}

projectileMotion.register( 'InitialValuesPanel', InitialValuesPanel );
export default InitialValuesPanel;