FROM alpine:3.16

RUN apk add --no-cache \
    nodejs \
    ffmpeg \
    mesa-demos \
    mesa-dri-intel \
    pulseaudio \
    pulseaudio-utils \
    mpv \
    python3 \
    ttf-dejavu \
    curl \
  && ln -s python3 /usr/bin/python \
  && wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl \
  && chmod 755 /usr/local/bin/youtube-dl \
  && adduser -u 1000 -D mpv \
  && mkdir -p /home/mpv/media \
  && mkdir -p /home/mpv/.config/mpv \
  && chown -R mpv:mpv /home/mpv

# Update and install required packages
RUN rm -rf /var/lib/apt/lists/* && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# copy umpv to path
COPY umpv /bin/
# make umpv executable
RUN chmod +x /bin/umpv

USER mpv

WORKDIR /home/mpv/media

VOLUME ["/home/mpv/media"]

# Create a directory for the server script
WORKDIR /app

# Copy the server script to the container
COPY youtube_mpv_server.js /app/

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["node", "youtube_mpv_server.js"]
