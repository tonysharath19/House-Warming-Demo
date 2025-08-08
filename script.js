document.addEventListener('DOMContentLoaded', function() {
    const keyImage = document.getElementById('keyImage');
    const keyText = document.getElementById('keyText');
    const keySection = document.getElementById('keySection');
    const videoSection = document.getElementById('videoSection');
    const videoPlayer = document.getElementById('videoPlayer');
    const venueButton = document.getElementById('venueButton');
    
    let isTransitioning = false;
    
    // Add glow effect to text
    keyText.classList.add('glow');
    
    // Key click handler
    keyImage.addEventListener('click', function() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Add glow effect to key
        keyImage.classList.add('glow');
        
        // Fade out text
        keyText.style.transition = 'opacity 0.5s ease';
        keyText.style.opacity = '0';
        
        // After animation, transition to video
        setTimeout(() => {
            // Fade out key section
            keySection.classList.add('fade-out');
            
            // After fade out, hide key section and show video section with fade in
            setTimeout(() => {
                keySection.style.display = 'none';
                videoSection.style.display = 'flex';
                videoSection.classList.add('fade-in');
                
                // Start playing videos
                playVideos();
            }, 1000);
        }, 1000);
    });
    
    // Video playlist
    const videos = [
        'VIDEO/HWM.mp4',
        'VIDEO/HWI.mp4'
    ];
    
    let currentVideoIndex = 0;
    
    function playVideos() {
        if (currentVideoIndex >= videos.length) {
            // All videos played
            return;
        }
        
        videoPlayer.src = videos[currentVideoIndex];
        videoPlayer.load();
        
        // Show venue button when HWI.mp4 is playing
        if (videos[currentVideoIndex] === 'VIDEO/HWI.mp4') {
            venueButton.style.display = 'block';
        }
        
        // Ensure video plays with sound
        videoPlayer.muted = false;
        
        videoPlayer.play().catch(error => {
            console.log('Autoplay failed:', error);
            // Fallback: try muted autoplay
            videoPlayer.muted = false;
            videoPlayer.play();
        });
        
        // Move to next video when current one ends
        videoPlayer.onended = function() {
            currentVideoIndex++;
            if (currentVideoIndex < videos.length) {
                playVideos();
            }
        };
    }
    
    // Handle mobile touch events
    keyImage.addEventListener('touchstart', function(e) {
        e.preventDefault();
        keyImage.click();
    });

    // Ensure videos can play on mobile
    videoPlayer.addEventListener('loadedmetadata', function() {
        videoPlayer.play();
    });

    // Venue button click handler - redirect to random location
    venueButton.addEventListener('click', function() {
        const randomLocations = [
            'https://maps.google.com/?q=restaurant+near+me',
            'https://maps.google.com/?q=cafe+near+me',
            'https://maps.google.com/?q=shopping+malls+near+me',
            'https://maps.google.com/?q=parks+near+me',
            'https://maps.google.com/?q=beaches+near+me',
            'https://maps.google.com/?q=movie+theaters+near+me',
            'https://maps.google.com/?q=hotels+near+me',
            'https://maps.google.com/?q=tourist+attractions+near+me'
        ];
        
        const randomIndex = Math.floor(Math.random() * randomLocations.length);
        window.open(randomLocations[randomIndex], '_blank');
    });
    // Handle mobile touch events
    keyImage.addEventListener('touchstart', function(e) {
        e.preventDefault();
        keyImage.click();
    });
    
    // Ensure videos can play on mobile
    videoPlayer.addEventListener('loadedmetadata', function() {
        videoPlayer.play();
    });
});
