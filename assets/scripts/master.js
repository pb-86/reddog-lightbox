console.info( 'RDDGLB: Searching for galleries…' );

const images = document.querySelectorAll( "[class*=wp-image]" );

if ( images.length !== 0 ) {
	const fullImage  = document.getElementById( 'rddglb-fullImage' );
	const prevButton = document.getElementById( 'rddglb-prevButton' );
	const nextButton = document.getElementById( 'rddglb-nextButton' );
	const modal      = document.getElementById( 'rddglb-modal' );
	
	images.forEach( function( item, index ) {
		item.addEventListener( 'click', function() {
			fullImage.setAttribute( 'src', this.getAttribute( 'srcset' ).split(',').pop().trim().split(' ')[0] );
			fullImage.setAttribute( 'data-index', index );
			prevButton.setAttribute( 'data-index', prevImageIndex( index ) );
			nextButton.setAttribute( 'data-index', nextImageIndex( index ) );
			openModal();
		});
	});
	
	prevButton.addEventListener( 'click', function() {
		const prevIndex = this.getAttribute( 'data-index' );
		fullImage.setAttribute( 'src', images[ prevIndex ].getAttribute( 'srcset' ).split(',').pop().trim().split(' ')[0] );
		prevButton.setAttribute( 'data-index', prevImageIndex( prevIndex ) );
		nextButton.setAttribute( 'data-index', nextImageIndex( prevIndex ) );
	});
	
	nextButton.addEventListener( 'click', function() {
		const nextIndex = this.getAttribute( 'data-index' );
		fullImage.setAttribute( 'src', images[ nextIndex ].getAttribute( 'srcset' ).split(',').pop().trim().split(' ')[0] );
		prevButton.setAttribute( 'data-index', prevImageIndex( nextIndex ) );
		nextButton.setAttribute( 'data-index', nextImageIndex( nextIndex ) );
	});

	modal.addEventListener( 'click', function(e) {
		if ( e.target === e.currentTarget ) {
			closeModal();
		}
	});

	function prevImageIndex( index ) {
		if ( index - 1 < 0 ) {
			index = images.length - 1;
		} else {
			index--;
		}
		return index;
	}
	
	function nextImageIndex( index ) {
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