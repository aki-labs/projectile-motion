// Copyright 2016, University of Colorado Boulder

/**
 * Common view for a screen.
 * 
 * @author Andrea Lin (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var BackgroundNode = require( 'PROJECTILE_MOTION/common/view/BackgroundNode' );
  var CannonNode = require( 'PROJECTILE_MOTION/common/view/CannonNode' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var FireButton = require( 'PROJECTILE_MOTION/common/view/FireButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MeasuringTape = require( 'SCENERY_PHET/MeasuringTape' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var projectileMotion = require( 'PROJECTILE_MOTION/projectileMotion' );
  var ProjectileMotionConstants = require( 'PROJECTILE_MOTION/common/ProjectileMotionConstants' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var TargetNode = require( 'PROJECTILE_MOTION/common/view/TargetNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ToolboxPanel = require( 'PROJECTILE_MOTION/common/view/ToolboxPanel' );
  var TracerNode = require( 'PROJECTILE_MOTION/common/view/TracerNode' );
  var TrajectoryNode = require( 'PROJECTILE_MOTION/common/view/TrajectoryNode' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Vector2 = require( 'DOT/Vector2' );
  var Util = require( 'DOT/Util' );
  var Property = require( 'AXON/Property' );
  var ZoomControl = require( 'PROJECTILE_MOTION/common/view/ZoomControl' );

  // strings
  var metersString = require( 'string!PROJECTILE_MOTION/meters');
  var initialSpeedString = require( 'string!PROJECTILE_MOTION/initialSpeed' );
  var normalString = require( 'string!PROJECTILE_MOTION/normal' );
  var slowString = require( 'string!PROJECTILE_MOTION/slow' );
  var pattern0Value1UnitsWithSpaceString = require( 'string!PROJECTILE_MOTION/pattern0Value1UnitsWithSpace' );
  var metersPerSecondString = require( 'string!PROJECTILE_MOTION/metersPerSecond' );


  // constants
  var DEFAULT_SCALE = 25;
  var MIN_ZOOM = ProjectileMotionConstants.MIN_ZOOM;
  var MAX_ZOOM = ProjectileMotionConstants.MAX_ZOOM;
  var DEFAULT_ZOOM = ProjectileMotionConstants.DEFAULT_ZOOM;
  var TEXT_FONT = ProjectileMotionConstants.PANEL_LABEL_OPTIONS.font;
  var INSET = ProjectileMotionConstants.PLAY_CONTROLS_HORIZONTAL_INSET;
  var TEXT_MAX_WIDTH = ProjectileMotionConstants.PLAY_CONTROLS_TEXT_MAX_WIDTH;
  var X_MARGIN = 10;
  var Y_MARGIN = 5;
  var FLATIRONS_RANGE = { min: 1500, max: 1700 };

  /**
   * @param {ProjectileMotionModel} model
   * @param {Panel} topRightPanel - the projectile control panel at the top right
   * @param {Panel} bottomRightPanel - the vectors control panel at the bottom right
   * @param {VectorVisibilityProperties} vectorVisibilityProperties - properties that determine which vectors are shown
   * @param {Object} [options]
   * @constructor
   */
  function ProjectileMotionScreenView(
                                      model,
                                      topRightPanel,
                                      bottomRightPanel,
                                      vectorVisibilityProperties,
                                      options
  ) {

    options = options || {};
    var self = this;

    ScreenView.call( this, options );

    // model view transform
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      ProjectileMotionConstants.VIEW_ORIGIN, // empirically determined based off original sim
      DEFAULT_SCALE // scale for meters to view units, empirically determined based off original sim
    );

    var transformProperty = new Property( modelViewTransform );

    // target
    var targetNode = new TargetNode( model.score, transformProperty, this );

    // trajectories layer, so all trajectories are in front of control panel but behind measuring tape
    var trajectoriesLayer = new Node();

    function handleTrajectoryAdded( addedTrajectory ) {
      // create the view representation for added trajectory 
      var trajectoryNode = new TrajectoryNode(
        vectorVisibilityProperties,
        addedTrajectory,
        // model.totalVelocityVectorOnProperty,
        // model.componentsVelocityVectorsOnProperty,
        // model.componentsAccelerationVectorsOnProperty,
        transformProperty
      );

      trajectoriesLayer.addChild( trajectoryNode );

      // Add the removal listener for if and when this trajectory is removed from the model.
      model.trajectories.addItemRemovedListener( function removalListener( removedProjectile ) {
        if ( removedProjectile === addedTrajectory ) {
          trajectoriesLayer.removeChild( trajectoryNode );
          model.trajectories.removeItemRemovedListener( removalListener );
        }
      } );
    }

    // view listens to whether a trajectory has been added in the model
    model.trajectories.forEach( handleTrajectoryAdded );
    model.trajectories.addItemAddedListener( handleTrajectoryAdded );

    // cannon
    var cannonNode = new CannonNode( model.cannonHeightProperty, model.cannonAngleProperty, transformProperty );

    // initial speed readout, slider, and tweakers
    // TODO: pass in range because it is different for each screen
    var initialSpeedControl = new NumberControl(
      initialSpeedString, model.launchVelocityProperty,
      ProjectileMotionConstants.LAUNCH_VELOCITY_RANGE, {
        valuePattern: StringUtils.format( pattern0Value1UnitsWithSpaceString, '{0}', metersPerSecondString ),
        valueBackgroundStroke: 'gray',
        valueAlign: 'center',
        titleFont: TEXT_FONT,
        valueFont: TEXT_FONT,
        constrainValue: function( value ) { return Util.roundSymmetric( value ); },
        majorTickLength: 5,
        majorTicks: [ { value: ProjectileMotionConstants.LAUNCH_VELOCITY_RANGE.min }, { value: ProjectileMotionConstants.LAUNCH_VELOCITY_RANGE.max } ],
        trackSize: new Dimension2( 120, 0.5 ), // width is empirically determined
        thumbSize: new Dimension2( 16, 28 ),
        thumbTouchAreaXDilation: 6,
        thumbTouchAreaYDilation: 4
      }
    );

    var initialSpeedPanel = new Panel(
      initialSpeedControl,
      _.extend( { left: cannonNode.left, bottom: this.layoutBounds.bottom - Y_MARGIN }, ProjectileMotionConstants.INITIAL_SPEED_PANEL_OPTIONS )
    );


    // Create a measuring tape (set to invisible initially)
    var measuringTapeNode = new MeasuringTape(
      new Property( { name: metersString, multiplier: 1 } ),
      model.measuringTape.isActiveProperty, {
        dragBounds: transformProperty.get().viewToModelBounds( this.layoutBounds ),
        modelViewTransform: transformProperty.get(),
        basePositionProperty: model.measuringTape.basePositionProperty,
        tipPositionProperty: model.measuringTape.tipPositionProperty,
        isTipDragBounded: true,
        textColor: 'black'
    } );

    // listen to transform property
    transformProperty.link( function( transform ) {
      measuringTapeNode.setModelViewTransform( transform );
      measuringTapeNode.setDragBounds( transform.viewToModelBounds( self.layoutBounds ) );
    } );


    // add view for tracer
    var tracerNode = new TracerNode(
      model.tracer,
      transformProperty,
      this
    );

    // zoomableNode.mutate( {
    //   children: [
    //     targetNode,
    //     trajectoriesLayer,
    //     cannonNode
    //   ]
    // } );

    // // zoom property
    var zoomProperty = new Property( DEFAULT_ZOOM );

    // // Watch the zoom property and zoom in and out correspondingly, using 3 dimemsional matrix.
    // // scale matrix algorithm taken from neuron repo
    zoomProperty.link( function( zoomFactor ) {
      transformProperty.set( ModelViewTransform2.createSinglePointScaleInvertedYMapping(
        Vector2.ZERO,
        ProjectileMotionConstants.VIEW_ORIGIN, // empirically determined based off original sim
        DEFAULT_SCALE * zoomFactor // scale for meters to view units, with zoom taken into consideration
      ) );

    } );

    // zoom control view and position it
    var zoomControl = new ZoomControl( zoomProperty, MIN_ZOOM, MAX_ZOOM );
    zoomControl.left = 0;

    // toolbox panel contains measuring tape. lab screen will add a tracer tool
    var toolboxPanel = new ToolboxPanel( model.measuringTape, model.tracer, measuringTapeNode, tracerNode, transformProperty );

    // play/pause button
    var playPauseButton = new PlayPauseButton( model.isPlayingProperty, {
      radius: 18,
      bottom: ProjectileMotionConstants.VIEW_ORIGIN.y - 30,
    } );

    // step button
    var stepButton = new StepForwardButton( {
      playingProperty: model.isPlayingProperty,
      listener: function() { model.stepModelElements( 0.016 ); },
      radius: 12,
      stroke: 'black',
      fill: '#005566',
      centerY: playPauseButton.centerY
    } );

    // make the play/pause button bigger when it is paused
    var pauseSizeIncreaseFactor = 1.25;
    model.isPlayingProperty.lazyLink( function( isPlaying ) {
      playPauseButton.scale( isPlaying ? ( 1 / pauseSizeIncreaseFactor ) : pauseSizeIncreaseFactor );
    } );

    // sim speed controls
    var normalText = new Text( normalString, {
      font: new PhetFont( 14 ),
      maxWidth: TEXT_MAX_WIDTH
    } );
    var normalMotionRadioBox = new AquaRadioButton( model.speedProperty, 'normal', normalText, { radius: 10 } );

    var slowText = new Text( slowString, {
      font: new PhetFont( 14 ),
      maxWidth: TEXT_MAX_WIDTH
    } );
    var slowMotionRadioBox = new AquaRadioButton( model.speedProperty, 'slow', slowText, { radius: 10 } );

    var speedControl = new VBox( {
      align: 'left',
      spacing: 4,
      bottom: playPauseButton.bottom,
      children: [ normalMotionRadioBox, slowMotionRadioBox ]
    } );

    // fire button
    var fireButton = new FireButton( {
      minWidth: 50,
      iconWidth: 30,
      minHeight: 40,
      listener: function() { model.cannonFired(); },
      centerY: initialSpeedPanel.centerY,
      left: initialSpeedPanel.right + 30
    } );

    // eraser button
    var eraserButton = new EraserButton( {
      minWidth: 50,
      iconWidth: 30,
      minHeight: 40,
      listener: function() { model.eraseProjectiles(); },
      bottom: fireButton.bottom,
      left: fireButton.right + 2 * X_MARGIN
    } );

    // reset all button, also a closure for zoomProperty and measuringTape
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        vectorVisibilityProperties.reset();
        targetNode.reset();
        zoomProperty.reset();
      },
      bottom: this.layoutBounds.maxY - Y_MARGIN
    } );

    // @private properties to be layout
    this.topRightPanel = topRightPanel;
    this.bottomRightPanel = bottomRightPanel;
    this.toolboxPanel = toolboxPanel;
    this.resetAllButton = resetAllButton;
    this.playPauseButton = playPauseButton;
    this.stepButton = stepButton;
    this.speedControl = speedControl;
    this.backgroundNode = new BackgroundNode( this.layoutBounds );
    this.zoomControl = zoomControl;

    // flatirons
    model.altitudeProperty.link( function( altitude ) {
      self.backgroundNode.showOrHideFlatirons( altitude >= FLATIRONS_RANGE.min && altitude <= FLATIRONS_RANGE.max );
    } );

    // rendering order
    this.setChildren( [
      this.backgroundNode,
      // zoomableNode,
      targetNode,
      trajectoriesLayer,
      cannonNode,
      initialSpeedPanel,
      bottomRightPanel,
      topRightPanel,
      toolboxPanel,
      measuringTapeNode,
      tracerNode,
      fireButton,
      eraserButton,
      speedControl,
      stepButton,
      playPauseButton,
      zoomControl,
      resetAllButton
    ] );
  }

  projectileMotion.register( 'ProjectileMotionScreenView', ProjectileMotionScreenView );

  return inherit( ScreenView, ProjectileMotionScreenView, {
    layout: function( width, height ) {
      this.resetTransform();

      var scale = this.getLayoutScale( width, height );
      this.setScaleMagnitude( scale );

      var offsetX = 0;
      var offsetY = 0;

      // Move to bottom vertically
      if ( scale === width / this.layoutBounds.width ) {
        offsetY = ( height / scale - this.layoutBounds.height );
      }

      // center horizontally
      else if ( scale === height / this.layoutBounds.height ) {
        offsetX = ( width - this.layoutBounds.width * scale ) / 2 / scale;
      }
      this.translate( offsetX, offsetY );

      this.backgroundNode.layout( offsetX, offsetY, width, height, scale );

      this.topRightPanel.right = width / scale - offsetX - X_MARGIN;
      this.topRightPanel.top = Y_MARGIN - offsetY;
      this.bottomRightPanel.setRightTop( this.topRightPanel.rightBottom.plusXY( 0, Y_MARGIN ) );
      this.toolboxPanel.setRightTop( this.topRightPanel.leftTop.minusXY( X_MARGIN, 0 ) );
      this.speedControl.left = this.topRightPanel.left;
      this.stepButton.right = this.topRightPanel.right - X_MARGIN;
      this.playPauseButton.right = this.stepButton.left - 2 * INSET;
      this.resetAllButton.right = this.topRightPanel.right;
      this.zoomControl.top = Y_MARGIN - offsetY;
      this.zoomControl.left = this.layoutBounds.minX + X_MARGIN;
    }

  } );
} );

