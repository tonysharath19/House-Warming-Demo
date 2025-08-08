document.addEventListener('DOMContentLoaded', function() {
    const keyImage = document.getElementById('keyImage');
    const keyText = document.getElementById('keyText');
    const keySection = document.getElementById('keySection');
    const videoSection = document.getElementById('videoSection');
    const videoPlayer = document.getElementById('videoPlayer');
    
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
            keySection.style.display = 'none';
            videoSection.style.display = 'flex';
            
            // Start playing videos
            playVideos();
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
});
