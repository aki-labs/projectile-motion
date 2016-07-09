// Copyright 2015, University of Colorado Boulder

/**
 *
 * @author PhET Interactive Simulations
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var projectileMotion = require( 'PROJECTILE_MOTION/projectileMotion' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ControlPanel = require( 'PROJECTILE_MOTION/projectile-motion/view/ControlPanel' );
  var TrajectoryNode = require( 'PROJECTILE_MOTION/projectile-motion/view/TrajectoryNode');

  /**
   * @param {ProjectileMotionModel} projectileMotionModel
   * @constructor
   */
  function ProjectileMotionScreenView( projectileMotionModel ) {

    ScreenView.call( this );

    // Reset All button
    this.addChild( new ControlPanel( projectileMotionModel, {
      x: 700,
      y: 300
    } ) );

    function handleTrajectoryAdded( addedTrajectory ) {

      // Create and add the view representation for this bar magnet.
      var trajectoryNode = new TrajectoryNode( projectileMotionModel.trajectory );

      this.addChild( trajectoryNode );

      // Add the removal listener for if and when this bar magnet is removed from the model.
      projectileMotionModel.trajectories.addItemRemovedListener( function removalListener( removedTrajectory ) {
        if ( removedTrajectory === addedTrajectory ) {
          this.removeChild( trajectoryNode );
          projectileMotionModel.trajectories.removeItemRemovedListener( removalListener );
        }
      } );
    }
    
    // trajectory node always listens to this initial trajectory passed to it
    // so even though you have code in the model that creates a new trajectory
    // this node doesn't know!
    // so you'll probably want an observable array
    // this.addChild( new TrajectoryNode( projectileMotionModel.trajectory ) );
  }

  projectileMotion.register( 'ProjectileMotionScreenView', ProjectileMotionScreenView );

  return inherit( ScreenView, ProjectileMotionScreenView );
} );

