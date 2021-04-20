console.info( 'RDDGLB: Searching for galleries…' );

const images = document.querySelectorAll( "[class*=wp-image]" );

if ( images.length !== 0 ) {
	const fullImage  = document.getElementById( 'rddglb-fullImage' );
	const prevButton = document.getElementById( 'rddglb-prevButton' );
	const nextButton = document.getElementById( 'rddglb-nextButton' );
	const modal      = document.getElementById( 'rddglb-modal' );
	
	images.forEach( function( item, index ) {
		item.addEventListener( 'click', function() {
			fullImage.setAttribute( 'src', getFullImageSrc( this ) );
			fullImage.setAttribute( 'data-index', index );
			prevButton.setAttribute( 'data-index', getPrevImageIndex( index ) );
			nextButton.setAttribute( 'data-index', getNextImageIndex( index ) );
			openModal();
		});
	});
	
	prevButton.addEventListener( 'click', function() {
		const prevIndex = this.getAttribute( 'data-index' );
		fullImage.setAttribute( 'src', getFullImageSrc( images[ prevIndex ] ) );
		prevButton.setAttribute( 'data-index', getPrevImageIndex( prevIndex ) );
		nextButton.setAttribute( 'data-index', getNextImageIndex( prevIndex ) );
	});
	
	nextButton.addEventListener( 'click', function() {
		const nextIndex = this.getAttribute( 'data-index' );
		fullImage.setAttribute( 'src', getFullImageSrc( images[ nextIndex ] ) );
		prevButton.setAttribute( 'data-index', getPrevImageIndex( nextIndex ) );
		nextButton.setAttribute( 'data-index', getNextImageIndex( nextIndex ) );
	});

	modal.addEventListener( 'click', function(e) {
		if ( e.target === e.currentTarget ) {
			closeModal();
		}
	});

	function getFullImageSrc( image ) {
		if ( image.getAttribute( 'data-full-url' ) ) {
			return image.getAttribute( 'data-full-url' );
		} else {
			return image.getAttribute( 'srcset' ).split(',').pop().trim().split(' ')[0];
		}
	}

	function getPrevImageIndex( index ) {
		if ( index - 1 < 0 ) {
			index = images.length - 1;
		} else {
			index--;
		}
		return index;
	}
	
	function getNextImageIndex( index ) {
		if ( index >= images.length - 1 ) {
			index = 0;
		} else {
			index++;
		}
		return index;
	}

	function openModal() {
		modal.classList.add( 'rddglb-modal--show' );
		document.body.classList.add( 'rddglb-overflow' );
	}

	function closeModal() {
		modal.classList.remove( 'rddglb-modal--show' );
		document.body.classList.remove( 'rddglb-overflow' );
	}
	
	console.info( 'RDDGLB: Ready to go!' );
} else {
	console.warn( "RDDGLB: It seems that there is no galleries on this page." );
	console.info( "RDDGLB: I have nothing to do. Zzz…" );
}