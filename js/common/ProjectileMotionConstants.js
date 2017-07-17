// Copyright 2016, University of Colorado Boulder

/**
 * Constants for the entire sim, global.
 *
 * @author Andrea Lin (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var projectileMotion = require( 'PROJECTILE_MOTION/projectileMotion' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );

  var ProjectileMotionConstants = {

    // truths about the world
    GRAVITY_RANGE: new Range( 5, 20 ), // in m/s/s
    GRAVITY_ON_EARTH: 9.81,
    SPHERE_DRAG_COEFFICIENT: 0.47, // https://en.wikipedia.org/wiki/Drag_coefficient

    // screen view layout
    VIEW_ORIGIN: new Vector2( 100, 520 ),

    // cannonball defaults
    CANNONBALL_MASS: 5.44,
    CANNONBALL_DIAMETER: 0.11,
    CANNONBALL_DRAG_COEFFICIENT: 0.47,

    // productive constraints
    MAX_NUMBER_OF_PROJECTILES: 5,
    MAX_NUMBER_OF_FLYING_PROJECTILES: 3,

    CANNON_HEIGHT_RANGE: new Range( 0, 15 ),
    CANNON_ANGLE_RANGE: new Range( -90, 90 ),
    LAUNCH_VELOCITY_RANGE: new Range( 0, 30 ),

    PROJECTILE_MASS_RANGE: new Range( 1, 10 ), // in original, highest is 1000
    PROJECTILE_DIAMETER_RANGE: new Range( 0.1, 1 ), // in original, smallest is 0.043

    // projectile and trajectory
    AIR_RESISTANCE_ON_PATH_COLOR: 'rgb( 252, 40, 252 )',
    AIR_RESISTANCE_OFF_PATH_COLOR: 'blue',
    VELOCITY_ARROW_FILL: 'rgb( 50, 255, 50 )',
    ACCELERATION_ARROW_FILL: 'rgb( 255, 255, 50 )',
    PATH_WIDTH: 2,

    // icons
    VELOCITY_VECTOR_ICON: new ArrowNode( 0, 0, 20, 0, { 
      fill: 'rgb( 50, 255, 50 )',
      lineWidth: 0.5,
      tailWidth: 4,
      headWidth: 10,
      headHeight: 8
    } ),
    ACCELERATION_VECTOR_ICON:new ArrowNode( 0, 0, 20, 0, { 
      fill: 'rgb( 255, 255, 50 )',
      lineWidth: 0.5,
      tailWidth: 4,
      headWidth: 10,
      headHeight: 8
    } ),
    FORCE_VECTOR_ICON: new ArrowNode( 0, 0, 20, 0, { 
      fill: 'black',
      stroke: null,
      tailWidth: 4,
      headWidth: 10,
      headHeight: 8
    } ),
    AIR_RESISTANCE_ICON: null, 

    // data point collection along the trajectory
    TIME_PER_DATA_POINT: 25, // milliseconds
    TIME_PER_SHOWN_DOT: 50, // milliseconds
    DOT_RADIUS: 1.75, // in global view coordinates

    // teardrop to almost pancake shape
    PROJECTILE_DRAG_COEFFICIENT_RANGE: new Range( 0.04, 1 ),
    ALTITUDE_RANGE: new Range( 0, 5000 ), // meters, max is arbitrary but in upper stratosphere

    // target
    TARGET_X_DEFAULT: 15, // meters
    TARGET_WIDTH: 3, // meters
    TARGET_HEIGHT: 0.6, // meters

    // tracer
    LABEL_TEXT_OPTIONS: { font: new PhetFont( 14 ) },

    // control panels
    RIGHTSIDE_PANEL_OPTIONS: {
      align: 'center',
      controlsVerticalSpace: 10,
      minWidth: 260,
      xMargin: 10,
      xSpacing: 10,
      yMargin: 10,
      fill: 'rgb( 255, 238, 218 )',
      lineWidth: 1,
      stroke: 'black',
      textDisplayWidth: 60,
      textDisplayHeight: 24,
      sliderLabelSpacing: 6
    },

    INITIAL_SPEED_PANEL_OPTIONS: {
      fill: 'rgb( 235, 235, 235 )',
      lineWidth: 1,
      stroke: 'black',
      xMargin: 20,
      yMargin: 5
    },

    //Light gray, used as the 'disabled' color
    LIGHT_GRAY: 'rgb( 220, 220, 220 )',

    PANEL_TITLE_OPTIONS: { font: new PhetFont( { size: 14, weight: 'bold' } ), align: 'center' },
    PANEL_LABEL_OPTIONS: { font: new PhetFont( 14 ) },
    PANEL_BOLD_LABEL_OPTIONS: { font: new PhetFont( { size: 14, weight: 'bold' } ) },

    YELLOW_BUTTON_OPTIONS: {
      font: new PhetFont( 14 ),
      baseColor: PhetColorScheme.PHET_LOGO_YELLOW,
      cornerRadius: 4,
      xMargin: 12,
      yMargin: 7
    },

    // zooming
    MIN_ZOOM: 0.25,
    MAX_ZOOM: 2,
    DEFAULT_ZOOM: 1.0,

    // normal/slow/play/pause/step
    PLAY_CONTROLS_HORIZONTAL_INSET: 10,
    PLAY_CONTROLS_TEXT_MAX_WIDTH: 80,

    // David
    DAVID_HEIGHT: 2, // meters
    DAVID_HORIZONTAL_PLACEMENT: 7 // meters
  };

  projectileMotion.register( 'ProjectileMotionConstants', ProjectileMotionConstants );

  return ProjectileMotionConstants;

} );

