// Copyright 2017-2019, University of Colorado Boulder

/**
 * View Properties that are specific to visibility of vectors
 *
 * @author Andrea Lin (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const inherit = require( 'PHET_CORE/inherit' );
  const projectileMotion = require( 'PROJECTILE_MOTION/projectileMotion' );
  const Property = require( 'AXON/Property' );
  const VectorVisibilityProperties = require( 'PROJECTILE_MOTION/common/view/VectorVisibilityProperties' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function DragVectorVisibilityProperties( tandem ) {
    VectorVisibilityProperties.call( this, tandem );

    // @public vectors visibility for velocity and force, total or component
    this.velocityVectorsOnProperty = new BooleanProperty( false, { tandem: tandem.createTandem( 'velocityVectorsOnProperty' ) }  );
    this.forceVectorsOnProperty = new BooleanProperty( false, { tandem: tandem.createTandem( 'forceVectorsOnProperty' ) }  );
    this.totalOrComponentsProperty = new Property( 'total' ); // or 'components'

    // update which vectors to show based on controls
    // Doesn't need to be disposed because it lasts for the lifetime of the sim
    Property.multilink( [
      this.velocityVectorsOnProperty,
      this.forceVectorsOnProperty,
      this.totalOrComponentsProperty
    ], this.updateVectorVisibilities.bind( this ) );

  }

  projectileMotion.register( 'DragVectorVisibilityProperties', DragVectorVisibilityProperties );

  return inherit( VectorVisibilityProperties, DragVectorVisibilityProperties, {

    /**
     * Reset these Properties
     * @public
     * @override
     */
    reset: function() {
      VectorVisibilityProperties.prototype.reset.call( this );
      this.velocityVectorsOnProperty.reset();
      this.forceVectorsOnProperty.reset();
      this.totalOrComponentsProperty.reset();
    },

    /**
     * Update vector visibilities based on whether velocity and/or force vectors are on, and whether total or components
     * @private
     *
     * @param {boolean} velocityVectorsOn
     * @param {boolean} forceVectorsOn
     * @param {string} totalOrComponents
     */
    updateVectorVisibilities: function( velocityVectorsOn, forceVectorsOn, totalOrComponents ) {
      this.totalVelocityVectorOnProperty.set( velocityVectorsOn && totalOrComponents === 'total' );
      this.componentsVelocityVectorsOnProperty.set( velocityVectorsOn && totalOrComponents === 'components' );
      this.totalForceVectorOnProperty.set( forceVectorsOn && totalOrComponents === 'total' );
      this.componentsForceVectorsOnProperty.set( forceVectorsOn && totalOrComponents === 'components' );
    }
  } );
} );
