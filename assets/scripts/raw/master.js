console.info( 'RDDGLB: Searching for galleries…' );

const images = document.querySelectorAll( "[class*=wp-image]" );

if ( images.length !== 0 ) {
	const loading        = document.getElementById( 'rddglb-loading' );
	const fullImage      = document.getElementById( 'rddglb-fullImage' );
	const prevButton     = document.getElementById( 'rddglb-prevButton' );
	const nextButton     = document.getElementById( 'rddglb-nextButton' );
	const closeButton    = document.getElementById( 'rddglb-closeButton' );
	const counter        = document.getElementById( 'rddglb-counter' );
	const counterCurrent = document.getElementById( 'rddglb-counterCurrent' );
	const counterAll     = document.getElementById( 'rddglb-counterAll' );
	const modal          = document.getElementById( 'rddglb-modal' );
	
	images.forEach( function( item, index ) {
		item.addEventListener( 'click', function() {
			fullImage.setAttribute( 'src', getFullImageSrc( this ) );
			fullImage.setAttribute( 'data-index', index );
			prevButton.setAttribute( 'data-index', getPrevImageIndex( index ) );
			nextButton.setAttribute( 'data-index', getNextImageIndex( index ) );
			if ( images.length <= 1 ) {
				prevButton.classList.add( 'rddglb-modal__buttons--hide' );
				nextButton.classList.add( 'rddglb-modal__buttons--hide' );
				counter.classList.add( 'rddglb-modal__counter--hide' );
			} else {
				setCounter( images.length, index );
			}
			openModal();
		});
	});

	prevButton.addEventListener( 'click', showPrevImage);	
	nextButton.addEventListener( 'click', showNextImage);
	document.onkeydown = keyboardSupport;

	modal.addEventListener( 'click', function( e ) {
		if ( e.target === e.currentTarget ) {
			closeModal();
		}
	});

	closeButton.addEventListener( 'click', closeModal );

	function getFullImageSrc( image ) {
		if ( image.hasAttribute( 'data-full-url' ) ) {
			return image.getAttribute( 'data-full-url' );
		} else if ( image.hasAttribute( 'srcset' ) ) {
			return image.getAttribute( 'srcset' ).split(',').pop().trim().split(' ')[0];
		} else {
			const imageExtension = image.getAttribute( 'src' ).substring( image.getAttribute( 'src' ).lastIndexOf( '.' ) );
			const imageName      = image.getAttribute( 'src' ).substring( 0, image.getAttribute( 'src' ).lastIndexOf( '-' ) );
			return imageName + imageExtension;
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

	function showPrevImage() {
		const prevIndex = prevButton.getAttribute( 'data-index' );
		fullImage.removeAttribute( 'src' );
		fullImage.setAttribute( 'src', getFullImageSrc( images[ prevIndex ] ) );
		prevButton.setAttribute( 'data-index', getPrevImageIndex( prevIndex ) );
		nextButton.setAttribute( 'data-index', getNextImageIndex( prevIndex ) );
		setCounter( images.length, parseInt( prevIndex ) );
	}

	function showNextImage() {
		const nextIndex = nextButton.getAttribute( 'data-index' );
		fullImage.removeAttribute( 'src' );
		fullImage.setAttribute( 'src', getFullImageSrc( images[ nextIndex ] ) );
		prevButton.setAttribute( 'data-index', getPrevImageIndex( nextIndex ) );
		nextButton.setAttribute( 'data-index', getNextImageIndex( nextIndex ) );
		setCounter( images.length, parseInt( nextIndex ) );
	}

	function keyboardSupport( e ) {
		if ( modal.classList.contains( 'rddglb-modal--show' ) ) {
			if ( e.key === 'ArrowLeft' ) {
				showPrevImage();
			}
			if ( e.key === 'ArrowRight' ) {
				showNextImage();
			}
			if ( e.key === 'Escape' ) {
				closeModal();
			}
		}
	}

	function setCounter( all, current ) {
		counterCurrent.innerHTML = current + 1;
		counterAll.innerHTML = all;
	}

	function openModal() {
		modal.classList.add( 'rddglb-modal--show' );
		document.body.classList.add( 'rddglb-overflow' );
	}

	function closeModal() {
		modal.classList.remove( 'rddglb-modal--show' );
		document.body.classList.remove( 'rddglb-overflow' );
		fullImage.removeAttribute( 'src' );
		fullImage.removeAttribute( 'data-index' );
		prevButton.removeAttribute( 'data-index' );
		nextButton.removeAttribute( 'data-index' );
		counterCurrent.innerHTML = '';
		counterAll.innerHTML = '';
	}
	
	console.info( 'RDDGLB: Ready to go!' );
} else {
	console.warn( "RDDGLB: It seems that there is no galleries on this page." );
	console.info( "RDDGLB: I have nothing to do. Zzz…" );
}