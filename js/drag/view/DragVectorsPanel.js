// Copyright 2016-2019, University of Colorado Boulder

/**
 * Control panel for choosing which vectors are visible.
 *
 * @author Andrea Lin (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Panel = require( 'SUN/Panel' );
  const projectileMotion = require( 'PROJECTILE_MOTION/projectileMotion' );
  const ProjectileMotionConstants = require( 'PROJECTILE_MOTION/common/ProjectileMotionConstants' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );

  // strings
  const componentsString = require( 'string!PROJECTILE_MOTION/components' );
  const forceVectorsString = require( 'string!PROJECTILE_MOTION/forceVectors' );
  const totalString = require( 'string!PROJECTILE_MOTION/total' );
  const velocityVectorsString = require( 'string!PROJECTILE_MOTION/velocityVectors' );

  // constants
  const LABEL_OPTIONS = ProjectileMotionConstants.PANEL_LABEL_OPTIONS;
  const VELOCITY_VECTOR_ICON = ProjectileMotionConstants.VELOCITY_VECTOR_ICON;
  const FORCE_VECTOR_ICON = ProjectileMotionConstants.FORCE_VECTOR_ICON;

  /**
   * @param {VectorVisibilityProperties} vectorVisibilityProperties - Properties that determine which vectors are shown
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function DragVectorsPanel( vectorVisibilityProperties, tandem, options ) {

    // The first object is a placeholder so none of the others get mutated
    // The second object is the default, in the constants files
    // The third object is options specific to this panel, which overrides the defaults
    // The fourth object is options given at time of construction, which overrides all the others
    options = merge( {}, ProjectileMotionConstants.RIGHTSIDE_PANEL_OPTIONS, { align: 'left' }, options );

    const titleOptions = _.defaults( { maxWidth: options.minWidth - 2 * options.xMargin }, LABEL_OPTIONS );
    const checkboxOptions = {
      maxWidth: options.minWidth - 3 * options.xMargin - VELOCITY_VECTOR_ICON.width,
      boxWidth: 18
    };

    const totalLabel = new Text( totalString, titleOptions );
    const componentsLabel = new Text( componentsString, titleOptions );

    const totalOrComponentsRadioButtonGroup = new VerticalAquaRadioButtonGroup( vectorVisibilityProperties.totalOrComponentsProperty, [
      { node: totalLabel, tandemName: 'total', value: 'total' },
      { node: componentsLabel, tandemName: 'components', value: 'components' }
    ], {
      radioButtonOptions: { radius: 8 },
      spacing: 10,
      touchAreaXDilation: 5,
      maxWidth: titleOptions.maxWidth,
      tandem: tandem.createTandem( 'totalOrComponentsRadioButtonGroup' )
    } );

    const velocityLabel = new Text( velocityVectorsString, titleOptions );
    const velocityCheckbox = new Checkbox( velocityLabel, vectorVisibilityProperties.velocityVectorsOnProperty, merge( {
      tandem: tandem.createTandem( 'velocityCheckbox' )
    }, checkboxOptions ) );
    const velocityCheckboxAndIcon = new HBox( {
      spacing: options.minWidth - velocityCheckbox.width - VELOCITY_VECTOR_ICON.width - 2 * options.xMargin,
      children: [
        velocityCheckbox,
        VELOCITY_VECTOR_ICON
      ]
    } );

    const forceLabel = new Text( forceVectorsString, titleOptions );
    const forceCheckbox = new Checkbox( forceLabel, vectorVisibilityProperties.forceVectorsOnProperty, merge( {
      tandem: tandem.createTandem( 'forceCheckbox' )
    }, checkboxOptions ) );
    const forceCheckboxAndIcon = new HBox( {
      spacing: options.minWidth - forceCheckbox.width - FORCE_VECTOR_ICON.width - 2 * options.xMargin,
      children: [
        forceCheckbox,
        FORCE_VECTOR_ICON
      ]
    } );

    // The contents of the control panel
    const content = new VBox( {
      align: 'left',
      spacing: options.controlsVerticalSpace,
      children: [
        totalOrComponentsRadioButtonGroup,
        velocityCheckboxAndIcon,
        forceCheckboxAndIcon
      ]
    } );

    Panel.call( this, content, options );
  }

  projectileMotion.register( 'DragVectorsPanel', DragVectorsPanel );

  return inherit( Panel, DragVectorsPanel );
} );

