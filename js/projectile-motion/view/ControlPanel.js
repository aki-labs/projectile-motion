// Copyright 2013-2015, University of Colorado Boulder

/**
 * Control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var projectileMotion = require( 'PROJECTILE_MOTION/projectileMotion' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HSlider = require( 'SUN/HSlider' );
  var RoundPushButton = require( 'SUN/buttons/RoundPushButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var velocityString = require( 'string!PROJECTILE_MOTION/velocity' );
  var angleString = require( 'string!PROJECTILE_MOTION/angle' );

  /**
   * Control panel constructor
   * @param {BarMagnet} barMagnetModel the entire model for the bar magnet screen
   * @param {Object} [options] scenery options for rendering the control panel, see the constructor for options.
   * @constructor
   */
  function ControlPanel( projectileMotionModel, options ) {

    // Demonstrate a common pattern for specifying options and providing default values.
    options = _.extend( {
        xMargin: 10,
        yMargin: 10,
        stroke: 'orange',
        lineWidth: 3
      },
      options );

    var velocityLabel = new Text( velocityString );

    var setVelocitySlider = new HSlider(
      projectileMotionModel.velocityProperty, {
        // range is in m/s
        min: 0,
        max: 100
      } );

    // in the future, move this value changer box into a function
    var velocityBox = new VBox( { children: [ velocityLabel, setVelocitySlider ] } );

    var angleLabel = new Text( angleString );

    var setAngleSlider = new HSlider(
      projectileMotionModel.angleProperty, {
        // range is in degrees
        min: 0,
        max: 90
      } );

    // in the future, move this value changer box into a function
    var angleBox = new VBox( { children: [ angleLabel, setAngleSlider ] } );

    var fireListener = function() {
      projectileMotionModel.setInitialConditions();
      projectileMotionModel.running = true;
    };

    var fireButton = new RoundPushButton( {
      baseColor: '#94b830',
      listener: fireListener
    } ); //green

    // 'Reset All' button, resets the sim to its initial state
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        projectileMotionModel.reset();
      }
    } );

    // The contents of the control panel
    var content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        velocityBox,
        angleBox,
        fireButton,
        resetAllButton
      ]
    } );

    Panel.call( this, content, options );
  }

  projectileMotion.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel );
} );

