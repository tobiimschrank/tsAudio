(function($, undefined) {
    var tsAudio = (function(conf) {
        var __ = tsAudio.prototype;
        
        __.audio = '';
        __.$audio = '';
        
        __.conf = {
            ogg: '', // you have to set the path to ogg-file in your call
            mp3: '', // you have to set the path to mp3-file in your call
            autoplay: false
        };
        
        function tsAudio(obj, conf) {
            obj.setConf(conf);
            obj.init();
            
            if(obj.conf.autoplay) {
                obj.publics.play();
            }
                
            return obj.publics;
        }
        
        __.init = function() {
            this.audio = new Audio();
            this.$audio = $(this.audio);
            if(this.publics.canPlayType('ogg')) {
                this.audio.src = this.conf.ogg;
            } else {
                this.audio.src = this.conf.mp3;
            }
        }
        
        __.setConf = function(conf) {
            $.extend(this.conf, conf);
        }
        
        __.publics = {
            getVolume: function() {
                return __.audio.volume * 100;
            },
            setVolume: function(volume) {
                var newVolume = volume / 100;
                if(newVolume < 0) {
                    newVolume = 0;
                } else if(newVolume > 1) {
                    newVolume = 1;
                }
                __.audio.volume = newVolume;
                return this;
            },
            louder: function() {
                this.setVolume(this.getVolume() + 10);
                return this;
            },
            quieter: function() {
                this.setVolume(this.getVolume() - 10);
                return this;
            },
            load: function(fileList) {},
            play: function() {
                __.audio.play();
                return this;
            },
            pause: function() {
                __.audio.pause();
                return this;
            },
            stop: function() {
                this.setCurrentTime(0);
                this.pause();
                return this;
            },
            mute: function() {
                this.setVolume(0);
                return this;
            },
            getDuration: function() {
                return __.audio.duration;
            },
            getCurrentTime: function() {
                return __.audio.currentTime;
            },
            setCurrentTime: function(time) {
                __.audio.currentTime = time;
                return this;
            },
            bind: function(ev, func) {
                __.$audio.bind(ev, func);
                return this;
            },
            // check different things
            isPaused: function() {
                return __.audio.paused;
            },
            isPlaying: function() {
                return !__.audio.paused;
            },
            isMute: function() {
                if(__.audio.volume === 0) {
                    return true;
                }
                return false;
            },
            canPlayType: function(type) {
                var mimeType = 'audio/mp3';
                switch(type) {
                    case 'ogg':
                        mimeType = 'audio/ogg';
                        break;
                    default:
                }
                
                if(__.audio.canPlayType(mimeType) !== '') {
                    return true;
                }
                return false;
            },
            getBufferedStart: function() {
                return __.audio.buffered.start(0);
            },
            getBufferedPercent: function() {
                var songLength = this.getDuration(),
                    bufferedLength = __.audio.buffered.end(0) - this.getBufferedStart();
                    
                return bufferedLength * 100 / songLength;
            }
        }
         
        return tsAudio(__, conf);
    });
    
    $.extend({
        tsAudio: tsAudio
    });
})(jQuery);