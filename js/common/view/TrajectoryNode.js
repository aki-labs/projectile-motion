// Copyright 2016, University of Colorado Boulder

/**
 * View for a trajectory.
 * Listens to an observable array of DataPoints in the model to draw dots on the trajectory
 * Creates and contains projectileNodes
 *
 * @author Andrea Lin( PhET Interactive Simulations )
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var projectileMotion = require( 'PROJECTILE_MOTION/projectileMotion' );
  var ProjectileMotionConstants = require( 'PROJECTILE_MOTION/common/ProjectileMotionConstants' );
  var ProjectileNode = require( 'PROJECTILE_MOTION/common/view/ProjectileNode' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var Util = require( 'DOT/Util' );

  // constants
  var MAX_COUNT = ProjectileMotionConstants.MAX_NUMBER_OF_PROJECTILES;
  var DOT_RADIUS = ProjectileMotionConstants.DOT_RADIUS; // view units
  var PATH_WIDTH = ProjectileMotionConstants.PATH_WIDTH; // view units
  var CURRENT_PATH_COLOR = ProjectileMotionConstants.AIR_RESISTANCE_OFF_PATH_COLOR;
  var AIR_RESISTANCE_ON_COLOR = ProjectileMotionConstants.AIR_RESISTANCE_ON_PATH_COLOR;
  var TIME_PER_SHOWN_DOT = ProjectileMotionConstants.TIME_PER_SHOWN_DOT; // milliseconds
  var PATH_MIN_OPACITY = 0;
  var PATH_MAX_OPACITY = 1;
  var DOTS_MIN_OPACITY = 0;
  var DOTS_MAX_OPACITY = 0.5;

  /**
   * @param {VectorVisibilityProperties} vectorVisibilityProperties - properties that determine which vectors are shown,
   * only needed to pass down to ProjectileNode
   * @param {Trajectory} trajectory - model for the trajectory
   * @param {Property.<ModelViewTransform2>} transformProperty
   * @constructor
   */
  function TrajectoryNode(
    vectorVisibilityProperties,
    trajectory,
    transformProperty
  ) {
    Node.call( this, { pickable: false, preventFit: true } );

    var scratchVector = new Vector2();
    var scratchVector2 = new Vector2();

    var currentPathShape = null;
    var currentPathStroke = null;

    var pathsLayer = new Node();
    var projectileNodesLayer = new Node();
    var projectileObjectViewsLayer = new Node();

    var dotsShape = new Shape();
    var dotsPath = new Path( dotsShape, {
      fill: 'black'
    } );

    this.addChild( projectileObjectViewsLayer );
    this.addChild( pathsLayer );
    this.addChild( dotsPath );
    this.addChild( projectileNodesLayer );

    var viewLastPosition = null;

    function handleDataPointAdded( addedPoint ) {
      var viewAddedPosition = scratchVector.set( addedPoint.position );
      transformProperty.get().getMatrix().multiplyVector2( viewAddedPosition );

      if ( viewLastPosition ) {
        var pathStroke = addedPoint.airDensity > 0 ? AIR_RESISTANCE_ON_COLOR : CURRENT_PATH_COLOR;
        if ( !currentPathShape || currentPathStroke !== pathStroke ) {
          currentPathShape = new Shape().moveTo( viewLastPosition.x, viewLastPosition.y );
          currentPathStroke = pathStroke;
          pathsLayer.addChild( new Path( currentPathShape, {
            lineWidth: PATH_WIDTH,
            stroke: pathStroke
          } ) );
        }
        currentPathShape.lineTo( viewAddedPosition.x, viewAddedPosition.y );
      }
      viewLastPosition = scratchVector2.set( viewAddedPosition );

      // draw dot if it is time for data point should be shown
      if ( Util.toFixedNumber( addedPoint.time * 1000, 0 ) % TIME_PER_SHOWN_DOT === 0 ) {

        dotsShape.moveTo( viewAddedPosition.x + DOT_RADIUS, viewAddedPosition.y )
                 .circle( viewAddedPosition.x, viewAddedPosition.y, DOT_RADIUS );
      }
    }

    // view listens to whether a datapoint has been added in the model
    trajectory.dataPoints.forEach( handleDataPointAdded );
    trajectory.dataPoints.addItemAddedListener( handleDataPointAdded );

    function handleProjectileObjectAdded( addedProjectileObject ) {
      var newProjectileNode = new ProjectileNode(
        vectorVisibilityProperties,
        addedProjectileObject.dataPointProperty,
        trajectory.projectileObjectType,
        trajectory.diameter,
        trajectory.dragCoefficient,
        transformProperty.get()
      );
      projectileNodesLayer.addChild( newProjectileNode );
      projectileObjectViewsLayer.addChild( newProjectileNode.projectileViewLayer );

      // Add the removal listener for if and when this trajectory is removed from the model.
      trajectory.projectileObjects.addItemRemovedListener( function removalListener( removedProjectileObject ) {
        if ( removedProjectileObject === addedProjectileObject ) {
          newProjectileNode.dispose(); // this also removes it as a child from projectileNodesLayer
          trajectory.projectileObjects.removeItemRemovedListener( removalListener );
        }
      } );

    }

    // view adds projectile object if another one is created in the model
    trajectory.projectileObjects.forEach( handleProjectileObjectAdded );
    trajectory.projectileObjects.addItemAddedListener( handleProjectileObjectAdded );

    function updateTransform( transform ) {
      pathsLayer.removeAllChildren();

      currentPathShape = null;
      currentPathStroke = null;

      dotsShape = new Shape();
      dotsPath.shape = dotsShape;

      viewLastPosition = null;

      assert && assert( trajectory.dataPoints.get( 0 ).position.x === 0, 'Initial point x is not zero but ' + trajectory.dataPoints.get( 0 ).position.x );

      trajectory.dataPoints.forEach( handleDataPointAdded );
      projectileNodesLayer.removeAllChildren();
      projectileObjectViewsLayer.removeAllChildren();
      trajectory.projectileObjects.forEach( handleProjectileObjectAdded );
    }

    // update if model view transform changes
    transformProperty.lazyLink( updateTransform );

    function updateOpacity( rank ) {
      var strength = ( MAX_COUNT - rank ) / MAX_COUNT;
      pathsLayer.opacity = PATH_MIN_OPACITY + strength * ( PATH_MAX_OPACITY - PATH_MIN_OPACITY );
      projectileNodesLayer.opacity = pathsLayer.opacity;
      dotsPath.opacity = DOTS_MIN_OPACITY + strength * ( DOTS_MAX_OPACITY - DOTS_MIN_OPACITY );
    }

    // change decrease in opacity with each successive projectiled fired
    trajectory.rankProperty.link( updateOpacity );

    this.disposeTrajectoryNode = function() {
      while ( pathsLayer.children.length ) {
        pathsLayer.children.pop().dispose();
      }
      dotsPath.dispose();
      transformProperty.unlink( updateTransform );
      trajectory.rankProperty.unlink( updateOpacity );
    };
  }

  projectileMotion.register( 'TrajectoryNode', TrajectoryNode );

  return inherit( Node, TrajectoryNode, {

    /**
     * Dispose this trajectory for memory management
     * 
     * @public
     * @override
     */
    dispose: function() {
      this.disposeTrajectoryNode();
      Node.prototype.dispose.call( this );
    }
  } );
} );

