// Copyright 2016, University of Colorado Boulder

/**
 * This object is collection of constants that configure global properties.
 * If you change something here, it will change *everywhere* in this simulation.
 *
 * @author Andrea Lin (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var projectileMotion = require( 'PROJECTILE_MOTION/projectileMotion' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  var ProjectileMotionConstants = {

    // Truths about the world
    ACCELERATION_DUE_TO_GRAVITY: 9.8,

    // Initial values (defaults) for cannon/next projectile fired- used at startup and after reset
    HEIGHT_DEFAULT: 0, // meters
    ANGLE_DEFAULT: 80, // degrees
    VELOCITY_DEFAULT: 18, // m/s

    // Customizable parameters (defaults) for the next projectile fired
    MASS_DEFAULT: 5, // kg
    DIAMETER_DEFAULT: 0.37, // of a pumpkin, in meters
    DRAG_COEFFICIENT_DEFAULT: 0.6, // of a pumpkin

    // Properties that change the environment (defaults)
    ALTITUDE_DEFAULT: 0, // meters, will change to 0 meters
    AIR_RESISTANCE_ON_DEFAULT: false,

    // Productive constraints
    HEIGHT_RANGE: { min: 0, max: 10 },
    ANGLE_RANGE: { min: -90, max: 180 },
    VELOCITY_RANGE: { min: 0, max: 50 },
    MASS_RANGE: { min: 0.04, max: 100 }, // in original, highest is 1000
    DIAMETER_RANGE: { min: 0.1, max: 2.5 }, // in original, smallest is 0.043
    DRAG_COEFFICIENT_RANGE: { min: 0, max: 50 }, // completely arbitrary
    ALTITUDE_RANGE: { min: 0, max: 30000 }, // meters, max is arbitrary but in upper stratosphere

    // Vectors
    ARROW_SIZE_DEFAULT: 1, // 1 means velocity of 1 m/s is represented with 1 m length, can scale down
    ARROW_FILL_COLOR: 'rgb( 100, 100, 100 )',
    ARROW_HEAD_WIDTH: 12, // view units
    ARROW_TAIL_WIDTH: 6, // view units

    // Cannon
    CANNON_LENGTH: 3, // meters
    CANNON_WIDTH: 0.7, // meters

    // Target
    TARGET_X_DEFAULT: 15, // meters
    TARGET_LENGTH: 2, // meters
    TARGET_WIDTH: 0.5, // meters
    SHOW_SCORE_TIME: 1, // seconds

    // Measuring tape
    TAPE_MEASURE_X_DEFAULT: 0,
    TAPE_MEASURE_Y_DEFAULT: 0, // location will be transformed, but not length

    // Panels
    PANEL_FILL_COLOR: 'rgb( 255, 238, 218 )',
    PANEL_TITLE_OPTIONS: { font: new PhetFont( 16 ), align: 'center' },
    PANEL_LABEL_OPTIONS: { font: new PhetFont( 11 ) },

    // Zooming
    MIN_ZOOM: 0.5,
    MAX_ZOOM: 5,
    DEFAULT_ZOOM: 1.0,

    // normal/slow/play/pause/step
    PLAY_CONTROLS_HORIZONTAL_INSET: 10,
    PLAY_CONTROLS_TEXT_MAX_WIDTH: 80
  };

  projectileMotion.register( 'ProjectileMotionConstants', ProjectileMotionConstants );

  return ProjectileMotionConstants;

} );

