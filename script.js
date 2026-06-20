const VIDEO_QUALITIES = [
  { label:'4K',       res:'2160p', height:2160, badge:'4K',      badgeClass:'k4' },
  { label:'4K 60fps', res:'2160p60',height:2160,badge:'4K 60FPS',badgeClass:'k4', fps60:true },
  { label:'1440p',    res:'1440p', height:1440, badge:'QHD',     badgeClass:'' },
  { label:'1080p',    res:'1080p', height:1080, badge:'FHD',     badgeClass:'' },
  { label:'1080p 60fps',res:'1080p60',height:1080,badge:'FHD 60FPS',badgeClass:'',fps60:true},
  { label:'720p',     res:'720p',  height:720,  badge:'HD',      badgeClass:'' },
  { label:'720p 60fps',res:'720p60',height:720, badge:'HD 60FPS',badgeClass:'',fps60:true},
  { label:'480p',     res:'480p',  height:480,  badge:'SD',      badgeClass:'' },
  { label:'360p',     res:'360p',  height:360,  badge:'SD',      badgeClass:'' },
  { label:'240p',     res:'240p',  height:240,  badge:'LOW',     badgeClass:'' },
];

const VIDEO_FORMATS = {
  'mp4': {
    icon: '🎬',
    name: 'MP4',
    subtitle: 'MPEG-4 Part 14 · H.264 / AAC',
    tags: [
      { label:'Most Compatible', cls:'green' },
      { label:'Widely Supported', cls:'green' },
      { label:'Lossy', cls:'orange' },
    ],
    desc: `The most universally compatible video container. MP4 wraps H.264 video and AAC audio — two codecs supported by virtually every device, browser, smart TV, phone, and media player on the planet.\n\nYouTube will deliver the best H.264+AAC streams available. The resulting file plays everywhere without transcoding, making it ideal for sharing or storing for playback on TVs and older devices.`,
    specs: [
      { label: 'Video Codec', value: 'H.264 (AVC)' },
      { label: 'Audio Codec', value: 'AAC' },
      { label: 'File Size', value: 'Medium' },
      { label: 'Best For', value: 'Sharing / TV playback' },
    ],
    cmdFn: (url, h, fps60) => {
      const fpsFilter = fps60 ? `[fps<=60]` : '';
      return `yt-dlp -f "bestvideo[ext=mp4][height<=${h}]${fpsFilter}+bestaudio[ext=m4a]/best[ext=mp4][height<=${h}]" --merge-output-format mp4 "${url}"`;
    }
  },
  'mkv': {
    icon: '🎥',
    name: 'MKV',
    subtitle: 'Matroska · VP9 / AV1 Best Quality',
    tags: [
      { label:'Best Quality', cls:'blue' },
      { label:'Large File', cls:'orange' },
      { label:'PC / VLC', cls:'yellow' },
    ],
    desc: `MKV (Matroska) is a flexible open container that accepts any codec. When you choose MKV without forcing a codec, yt-dlp downloads the best available streams — typically VP9 or AV1 video and Opus audio — which are YouTube's highest-quality, most efficient native streams.\n\nThe trade-off: not every device or TV supports VP9/AV1 natively. For PC playback in VLC or MPV, this is the best choice you can make.`,
    specs: [
      { label: 'Video Codec', value: 'VP9 / AV1 (best)' },
      { label: 'Audio Codec', value: 'Opus / Vorbis' },
      { label: 'File Size', value: 'Large' },
      { label: 'Best For', value: 'Archiving / PC playback' },
    ],
    cmdFn: (url, h, fps60) => {
      const fpsFilter = fps60 ? `[fps<=60]` : '';
      return `yt-dlp -f "bestvideo[height<=${h}]${fpsFilter}+bestaudio/best[height<=${h}]" --merge-output-format mkv "${url}"`;
    }
  },
  'webm': {
    icon: '🌐',
    name: 'WebM',
    subtitle: 'Open web format · VP9 + Opus',
    tags: [
      { label:'Open Source', cls:'blue' },
      { label:'Small Size', cls:'green' },
      { label:'Web Native', cls:'green' },
    ],
    desc: `WebM is Google's open, royalty-free video container built for the web. It pairs VP9 video with Opus audio — both codecs YouTube uses natively, so no transcoding happens. The result is smaller file sizes than MP4 at the same perceptual quality.\n\nWebM plays natively in Chrome, Firefox, and most modern browsers. Less suitable for TVs or older media players.`,
    specs: [
      { label: 'Video Codec', value: 'VP9' },
      { label: 'Audio Codec', value: 'Opus' },
      { label: 'File Size', value: 'Small–Medium' },
      { label: 'Best For', value: 'Web playback / storage' },
    ],
    cmdFn: (url, h, fps60) => {
      const fpsFilter = fps60 ? `[fps<=60]` : '';
      return `yt-dlp -f "bestvideo[ext=webm][height<=${h}]${fpsFilter}+bestaudio[ext=webm]/bestvideo[height<=${h}]+bestaudio" --merge-output-format webm "${url}"`;
    }
  },
  'av1-mkv': {
    icon: '⚡',
    name: 'AV1',
    subtitle: 'Alliance for Open Media · Next-gen codec',
    tags: [
      { label:'Best Compression', cls:'blue' },
      { label:'Future-Proof', cls:'blue' },
      { label:'Slower Encode', cls:'red' },
    ],
    desc: `AV1 is the newest generation open-source video codec, developed by the Alliance for Open Media (Apple, Google, Netflix, Intel, and others). It delivers 30–50% smaller files than H.264 or VP9 at the same visual quality.\n\nYouTube streams AV1 for high-traffic videos. If the video has AV1 streams, yt-dlp will grab them into an MKV container. Not all older devices support AV1 playback, but modern browsers, iPhones (A17+), and Nvidia/AMD GPUs do.`,
    specs: [
      { label: 'Video Codec', value: 'AV1 (av01)' },
      { label: 'Audio Codec', value: 'Opus' },
      { label: 'File Size', value: 'Smallest' },
      { label: 'Best For', value: 'Storage-constrained / modern devices' },
    ],
    cmdFn: (url, h, fps60) => {
      const fpsFilter = fps60 ? `[fps<=60]` : '';
      return `yt-dlp -f "bestvideo[vcodec^=av01][height<=${h}]${fpsFilter}+bestaudio/bestvideo[height<=${h}]+bestaudio" --merge-output-format mkv "${url}"`;
    }
  },
  'h264-mp4': {
    icon: '📺',
    name: 'H.264 forced',
    subtitle: 'Forced avc1 codec · TV Compatible',
    tags: [
      { label:'TV Compatible', cls:'yellow' },
      { label:'Max Compat', cls:'green' },
      { label:'Larger File', cls:'orange' },
    ],
    desc: `Forces yt-dlp to specifically request H.264 (avc1) video streams and AAC audio, then merges them into MP4. This guarantees the output plays on virtually any device — USB sticks in TVs, older Blu-ray players, PS3/PS4, media centres, and car screens.\n\nNote: H.264 streams may not be available at every resolution on every video. yt-dlp falls back gracefully if needed. File sizes are larger than VP9/AV1 equivalents.`,
    specs: [
      { label: 'Video Codec', value: 'H.264 (avc1) forced' },
      { label: 'Audio Codec', value: 'AAC (mp4a) forced' },
      { label: 'File Size', value: 'Large' },
      { label: 'Best For', value: 'TV / USB / legacy devices' },
    ],
    cmdFn: (url, h, fps60) => {
      const fpsFilter = fps60 ? `[fps<=60]` : '';
      return `yt-dlp -f "bestvideo[vcodec^=avc1][height<=${h}]${fpsFilter}+bestaudio[acodec^=mp4a]/bestvideo[vcodec^=avc1][height<=${h}]+bestaudio/best[ext=mp4][height<=${h}]" --merge-output-format mp4 "${url}"`;
    }
  },
  'vp9-webm': {
    icon: '🔓',
    name: 'VP9 forced',
    subtitle: 'Forced VP9 codec · Google / Open',
    tags: [
      { label:'Open Source', cls:'blue' },
      { label:'Royalty-Free', cls:'blue' },
      { label:'Good Compression', cls:'green' },
    ],
    desc: `Forces VP9 video streams explicitly. VP9 is Google's open, royalty-free codec that outperforms H.264 significantly in both quality and compression. It's the most common codec YouTube uses for 1080p and above.\n\nThe result is placed in a WebM container. Excellent for PC, browser, or Android playback. Not ideal for older TVs or Apple devices without hardware VP9 decoding.`,
    specs: [
      { label: 'Video Codec', value: 'VP9 (vp9) forced' },
      { label: 'Audio Codec', value: 'Opus' },
      { label: 'File Size', value: 'Medium' },
      { label: 'Best For', value: 'Chrome / Android / Linux' },
    ],
    cmdFn: (url, h, fps60) => {
      const fpsFilter = fps60 ? `[fps<=60]` : '';
      return `yt-dlp -f "bestvideo[vcodec^=vp9][height<=${h}]${fpsFilter}+bestaudio[ext=webm]/bestvideo[vcodec^=vp9][height<=${h}]+bestaudio" --merge-output-format webm "${url}"`;
    }
  },
  'hevc-mkv': {
    icon: '🦅',
    name: 'H.265 / HEVC',
    subtitle: 'High Efficiency Video Coding · MKV',
    tags: [
      { label:'Efficient', cls:'blue' },
      { label:'Apple / Modern', cls:'yellow' },
      { label:'Rare on YouTube', cls:'red' },
    ],
    desc: `H.265 (HEVC) is Apple's preferred codec and the successor to H.264 — it delivers roughly twice the compression at the same visual quality. It's natively supported on all iPhones, Apple TVs, modern Samsung TVs, and Windows 10/11.\n\nHowever, YouTube rarely delivers H.265 streams. If no HEVC stream exists, yt-dlp will fall back to the best available option and place it in MKV. More useful when you already have a local HEVC file than as a download target.`,
    specs: [
      { label: 'Video Codec', value: 'H.265 / HEVC (hvc1)' },
      { label: 'Audio Codec', value: 'AAC' },
      { label: 'File Size', value: 'Small–Medium' },
      { label: 'Best For', value: 'Apple ecosystem / modern TVs' },
    ],
    cmdFn: (url, h, fps60) => {
      const fpsFilter = fps60 ? `[fps<=60]` : '';
      return `yt-dlp -f "bestvideo[vcodec^=hvc1][height<=${h}]${fpsFilter}+bestaudio/bestvideo[vcodec^=hevc][height<=${h}]+bestaudio/bestvideo[height<=${h}]+bestaudio" --merge-output-format mkv "${url}"`;
    }
  },
};

const AUDIO_FORMATS = {
  'mp3': {
    icon: '🎵',
    name: 'MP3',
    subtitle: 'MPEG-1 Audio Layer III · Universal',
    tags: [{ label:'Universal', cls:'green' }, { label:'Lossy', cls:'orange' }, { label:'Most Popular', cls:'green' }],
    desc: `MP3 is the most universally supported audio format in the world. It uses lossy compression that discards audio data deemed inaudible by the human ear. At 320kbps, the quality is virtually indistinguishable from lossless for most listeners.\n\nEvery single device, app, car stereo, MP3 player, phone, and speaker system supports MP3. Choose this if compatibility matters above all else.`,
    specs: [
      { label: 'Type', value: 'Lossy' },
      { label: 'Max Bitrate', value: '320 kbps' },
      { label: 'File Size', value: 'Medium' },
      { label: 'Best For', value: 'All devices / car / portables' },
    ],
    hasBitrate: true,
    bitrates: ['128K','192K','256K','320K'],
    bitrateLabels: ['128 kbps · small','192 kbps · balanced','256 kbps · high','320 kbps · best'],
    cmdFn: (url, br) => `yt-dlp -x --audio-format mp3 --audio-quality ${br} "${url}"`,
  },
  'opus': {
    icon: '🎛️',
    name: 'Opus',
    subtitle: 'IETF RFC 6716 · YouTube native',
    tags: [{ label:'Best Efficiency', cls:'blue' }, { label:'Lossy', cls:'orange' }, { label:'YouTube Native', cls:'green' }],
    desc: `Opus is YouTube's own native audio codec — the audio you're hearing in the browser is already Opus. Downloading as Opus means zero re-encoding: you get the source stream directly, with no quality loss from conversion.\n\nAt 128kbps, Opus sounds noticeably better than MP3 at 192kbps. Supported in all modern browsers, Android, VLC, and most desktop players. Not compatible with older iPods or car stereos.`,
    specs: [
      { label: 'Type', value: 'Lossy (very efficient)' },
      { label: 'Container', value: '.webm / .ogg' },
      { label: 'File Size', value: 'Smallest' },
      { label: 'Best For', value: 'PC / Android / no re-encode' },
    ],
    hasBitrate: false,
    cmdFn: (url) => `yt-dlp -x --audio-format opus "${url}"`,
  },
  'aac': {
    icon: '🍎',
    name: 'AAC',
    subtitle: 'Advanced Audio Coding · Apple / TV',
    tags: [{ label:'Apple Native', cls:'yellow' }, { label:'TV Compatible', cls:'yellow' }, { label:'Lossy', cls:'orange' }],
    desc: `AAC is Apple's preferred audio format and the successor to MP3. It sounds better than MP3 at equivalent bitrates, and is the native format for iPhones, iPads, iTunes, Apple Music, and Apple TV.\n\nAAC is also used inside MP4/M4A containers for video. All modern smart TVs, Sonos speakers, and AirPlay devices support AAC. An excellent choice if you're in the Apple ecosystem or want TV/USB playback compatibility.`,
    specs: [
      { label: 'Type', value: 'Lossy' },
      { label: 'Container', value: '.aac / .m4a' },
      { label: 'File Size', value: 'Small–Medium' },
      { label: 'Best For', value: 'iPhone / iPad / Apple TV' },
    ],
    hasBitrate: true,
    bitrates: ['128K','192K','256K','320K'],
    bitrateLabels: ['128 kbps · small','192 kbps · standard','256 kbps · high','320 kbps · best'],
    cmdFn: (url, br) => `yt-dlp -x --audio-format aac --audio-quality ${br} "${url}"`,
  },
  'flac': {
    icon: '💎',
    name: 'FLAC',
    subtitle: 'Free Lossless Audio Codec',
    tags: [{ label:'Lossless', cls:'blue' }, { label:'Audiophile', cls:'blue' }, { label:'Large File', cls:'orange' }],
    desc: `FLAC (Free Lossless Audio Codec) preserves every single bit of audio data with zero quality loss, while still compressing to 50–60% of raw WAV size. It's the audiophile's choice for archiving music.\n\nImportant caveat: YouTube's own source audio is already lossy (Opus/AAC). Downloading as FLAC doesn't recover the lost data — it simply wraps the re-encoded audio in a lossless container. Best used when you want the highest possible quality output from what's available, or for archiving purposes.`,
    specs: [
      { label: 'Type', value: 'Lossless (from lossy source)' },
      { label: 'Container', value: '.flac' },
      { label: 'File Size', value: 'Large' },
      { label: 'Best For', value: 'Archiving / audiophile DACs' },
    ],
    hasBitrate: false,
    cmdFn: (url) => `yt-dlp -x --audio-format flac "${url}"`,
  },
  'wav': {
    icon: '📼',
    name: 'WAV',
    subtitle: 'Waveform Audio · Uncompressed PCM',
    tags: [{ label:'Uncompressed', cls:'orange' }, { label:'Pro Audio', cls:'blue' }, { label:'Huge Files', cls:'red' }],
    desc: `WAV is completely uncompressed PCM audio — the raw waveform with no compression whatsoever. Files are enormous (a 4-minute song ≈ 40–50 MB), but WAV is universally compatible with every professional audio tool: DAWs, samplers, sound design software, and broadcast equipment.\n\nLike FLAC, the source is still lossy YouTube audio. Use WAV when you need to import the audio into a DAW (Pro Tools, Ableton, Logic) that requires uncompressed input.`,
    specs: [
      { label: 'Type', value: 'Uncompressed PCM' },
      { label: 'Container', value: '.wav' },
      { label: 'File Size', value: 'Very Large' },
      { label: 'Best For', value: 'DAW / audio editing / sampling' },
    ],
    hasBitrate: false,
    cmdFn: (url) => `yt-dlp -x --audio-format wav "${url}"`,
  },
  'm4a': {
    icon: '📱',
    name: 'M4A',
    subtitle: 'MPEG-4 Audio · iTunes / Apple Music',
    tags: [{ label:'Apple Native', cls:'yellow' }, { label:'Lossy', cls:'orange' }, { label:'iTunes', cls:'yellow' }],
    desc: `M4A is essentially AAC audio stored in an MPEG-4 container — the native format of iTunes and Apple Music. When yt-dlp downloads M4A, it often grabs the native YouTube AAC stream and remuxes it with zero re-encoding, preserving original quality.\n\nM4A files import seamlessly into iTunes, Apple Music, GarageBand, and Logic Pro. They also work on all modern Android devices and most portable music players.`,
    specs: [
      { label: 'Type', value: 'Lossy (AAC in MPEG-4)' },
      { label: 'Container', value: '.m4a' },
      { label: 'File Size', value: 'Small–Medium' },
      { label: 'Best For', value: 'iTunes / Apple Music import' },
    ],
    hasBitrate: false,
    cmdFn: (url) => `yt-dlp -x --audio-format m4a "${url}"`,
  },
  'vorbis': {
    icon: '🎸',
    name: 'Vorbis',
    subtitle: 'OGG Vorbis · Open / Linux',
    tags: [{ label:'Open Source', cls:'blue' }, { label:'Lossy', cls:'orange' }, { label:'Linux / VLC', cls:'blue' }],
    desc: `Ogg Vorbis is a free, open-source audio codec without any patents or royalties. It produces excellent audio quality at medium bitrates and is the native audio codec for the OGG container.\n\nVorbis is well-supported on Linux, Android, VLC, Spotify (internally), and most game engines. It's not natively supported by iTunes or older Apple devices. A solid choice for open-source enthusiasts or Linux-first workflows.`,
    specs: [
      { label: 'Type', value: 'Lossy (open source)' },
      { label: 'Container', value: '.ogg' },
      { label: 'File Size', value: 'Small–Medium' },
      { label: 'Best For', value: 'Linux / games / VLC' },
    ],
    hasBitrate: true,
    bitrates: ['128K','192K','256K','320K'],
    bitrateLabels: ['128 kbps · small','192 kbps · standard','256 kbps · high','320 kbps · best'],
    cmdFn: (url, br) => `yt-dlp -x --audio-format vorbis --audio-quality ${br} "${url}"`,
  },
  'alac': {
    icon: '🎼',
    name: 'ALAC',
    subtitle: 'Apple Lossless · M4A container',
    tags: [{ label:'Lossless', cls:'blue' }, { label:'Apple Native', cls:'yellow' }, { label:'Large File', cls:'orange' }],
    desc: `ALAC (Apple Lossless Audio Codec) is Apple's own lossless format — the direct competitor to FLAC but stored inside an M4A container. iTunes, Apple Music, and all Apple devices support it natively, which is its main advantage over FLAC in the Apple ecosystem.\n\nLike FLAC, ALAC re-encodes YouTube's already-lossy source audio into a lossless container. Use it if you want lossless quality and plan to use the file within Apple's ecosystem.`,
    specs: [
      { label: 'Type', value: 'Lossless (Apple)' },
      { label: 'Container', value: '.m4a (ALAC)' },
      { label: 'File Size', value: 'Large' },
      { label: 'Best For', value: 'iTunes / lossless Apple workflow' },
    ],
    hasBitrate: false,
    cmdFn: (url) => `yt-dlp -x --audio-format alac "${url}"`,
  },
};

let currentVideoId = null;
let currentURL = '';
let selectedQuality = null;
let selectedVideoFmt = 'mp4';
let selectedAudioFmt = 'mp3';
let selectedBitrate = null;
let _lastCmd = '';

window.addEventListener('DOMContentLoaded', () => {
  renderVideoInfo('mp4');
  renderAudioInfo('mp3');
  renderBitrateGrid('mp3');
});

async function pasteURL() {
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById('urlInput').value = text;
  } catch {
    document.getElementById('urlInput').focus();
  }
}

function extractVideoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('?')[0];
    return u.searchParams.get('v');
  } catch {
    const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }
}

function setStatus(msg, type = '') {
  const el = document.getElementById('statusBar');
  el.className = 'status-bar ' + type;
  el.innerHTML = type === 'loading' ? `<span class="blink"></span> ${msg}` : msg;
}

async function fetchInfo() {
  const url = document.getElementById('urlInput').value.trim();
  if (!url) { setStatus('▸ paste a youtube url first', 'error'); return; }

  const videoId = extractVideoId(url);
  if (!videoId) { setStatus('▸ invalid youtube url', 'error'); return; }

  currentVideoId = videoId;
  currentURL = url;
  selectedQuality = null;
  document.getElementById('fetchBtn').disabled = true;
  document.getElementById('videoCard').classList.remove('visible');
  hideCmdWrap();
  setStatus('fetching video info...', 'loading');

  try {
    const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
    const data = await res.json();
    if (!data.title) throw new Error('Not found');

    document.getElementById('videoTitle').textContent = data.title;
    document.getElementById('thumbImg').src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
    document.getElementById('videoDetails').textContent = `By ${data.author_name || 'Unknown'}`;

    buildQualityGrid();
    document.getElementById('videoCard').classList.add('visible');
    setStatus('▸ choose a tab, format, and quality', 'ok');
  } catch {
    setStatus('▸ could not fetch video info. check the url.', 'error');
  }
  document.getElementById('fetchBtn').disabled = false;
}

function switchTab(tab) {
  ['video','audio'].forEach(t => {
    document.getElementById('tab-' + t).classList.toggle('active', t === tab);
    document.getElementById('panel-' + t).classList.toggle('active', t === tab);
  });
  hideCmdWrap();
}

function selectVideoFmt(btn) {
  document.querySelectorAll('#videoSidebar .sidebar-item').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedVideoFmt = btn.dataset.vfmt;
  renderVideoInfo(selectedVideoFmt);
  if (selectedQuality === null) {
    document.getElementById('dlBtn').classList.add('disabled');
  } else {
    document.getElementById('dlBtn').classList.remove('disabled');
  }
  hideCmdWrap();
}

function renderVideoInfo(fmt) {
  const f = VIDEO_FORMATS[fmt];
  const panel = document.getElementById('videoInfoPanel');
  panel.innerHTML = `
    <div class="info-header">
      <div class="info-icon">${f.icon}</div>
      <div>
        <div class="info-title">${f.name}</div>
        <div class="info-subtitle">${f.subtitle}</div>
      </div>
    </div>
    <div class="info-tags">${f.tags.map(t => `<span class="info-tag ${t.cls}">${t.label}</span>`).join('')}</div>
    <div class="info-desc">${f.desc.replace(/\n\n/g, '<br><br>')}</div>
    <div class="info-specs">${f.specs.map(s => `
      <div class="spec-item">
        <div class="spec-label">${s.label}</div>
        <div class="spec-value">${s.value}</div>
      </div>`).join('')}
    </div>
  `;
}

function buildQualityGrid() {
  const grid = document.getElementById('qualityGrid');
  grid.innerHTML = '';
  VIDEO_QUALITIES.forEach((q, i) => {
    const btn = document.createElement('button');
    btn.className = 'quality-option';
    btn.dataset.index = i;
    btn.innerHTML = `<span class="q-res">${q.res}</span><span class="q-badge ${q.badgeClass}">${q.badge}</span>`;
    btn.onclick = () => {
      document.querySelectorAll('.quality-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedQuality = q;
      document.getElementById('dlBtn').classList.remove('disabled');
    };
    grid.appendChild(btn);
  });
}

function startVideoDownload() {
  if (!selectedQuality || !currentVideoId || document.getElementById('dlBtn').classList.contains('disabled')) return;
  const url = currentURL || `https://www.youtube.com/watch?v=${currentVideoId}`;
  const fmt = VIDEO_FORMATS[selectedVideoFmt];
  const cmd = fmt.cmdFn(url, selectedQuality.height, selectedQuality.fps60);
  const label = `${fmt.name} · ${selectedQuality.res}`;
  showCmd(cmd, label);
}

function selectAudioFmt(btn) {
  document.querySelectorAll('#audioSidebar .sidebar-item').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedAudioFmt = btn.dataset.afmt;
  selectedBitrate = null;
  renderAudioInfo(selectedAudioFmt);
  document.getElementById('audioDlBtn').classList.add('disabled');
  renderBitrateGrid(selectedAudioFmt);
  hideCmdWrap();
}
function renderAudioInfo(fmt) {
  const f = AUDIO_FORMATS[fmt];
  const panel = document.getElementById('audioInfoPanel');
  panel.innerHTML = `
    <div class="info-header">
      <div class="info-icon">${f.icon}</div>
      <div>
        <div class="info-title">${f.name}</div>
        <div class="info-subtitle">${f.subtitle}</div>
      </div>
    </div>
    <div class="info-tags">${f.tags.map(t => `<span class="info-tag ${t.cls}">${t.label}</span>`).join('')}</div>
    <div class="info-desc">${f.desc.replace(/\n\n/g, '<br><br>')}</div>
    <div class="info-specs">${f.specs.map(s => `
      <div class="spec-item">
        <div class="spec-label">${s.label}</div>
        <div class="spec-value">${s.value}</div>
      </div>`).join('')}
    </div>
  `;
}

function renderBitrateGrid(fmt) {
  const f = AUDIO_FORMATS[fmt];
  const sec = document.getElementById('bitrateSection');
  const grid = document.getElementById('bitrateGrid');

  if (!f.hasBitrate) {
    grid.innerHTML = `<div style="grid-column:1/-1;font-size:0.6rem;color:var(--muted2);letter-spacing:0.1em;padding:0.5rem 0">
      No bitrate selection needed — ${f.name} will be downloaded at native quality.
    </div>`;
    document.getElementById('audioDlBtn').classList.remove('disabled');
    selectedBitrate = 'native';
    return;
  }

  sec.style.display = 'block';
  grid.innerHTML = '';
  f.bitrates.forEach((br, i) => {
    const btn = document.createElement('button');
    btn.className = 'quality-option';
    const parts = f.bitrateLabels[i].split('·');
    btn.innerHTML = `<span class="q-res">${parts[0].trim()}</span><span class="q-badge">${parts[1] ? parts[1].trim() : ''}</span>`;
    btn.onclick = () => {
      grid.querySelectorAll('.quality-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedBitrate = br;
      document.getElementById('audioDlBtn').classList.remove('disabled');
    };
    grid.appendChild(btn);
  });
}

function startAudioDownload() {
  if (!currentVideoId || document.getElementById('audioDlBtn').classList.contains('disabled')) return;
  const url = currentURL || `https://www.youtube.com/watch?v=${currentVideoId}`;
  const fmt = AUDIO_FORMATS[selectedAudioFmt];
  const cmd = fmt.cmdFn(url, selectedBitrate);
  const label = `${fmt.name} Audio${selectedBitrate && selectedBitrate !== 'native' ? ' · ' + selectedBitrate : ''}`;
  showCmd(cmd, label);
}

function showCmd(cmd, label) {
  _lastCmd = cmd;
  const wrap = document.getElementById('cmdWrap');
  const box = document.getElementById('cmdBox');
  const lbl = document.getElementById('cmdLabel');
  const copyBtn = document.getElementById('cmdCopyBtn');

  lbl.textContent = '▸ ' + label + ' — run in terminal:';
  box.textContent = cmd;
  copyBtn.textContent = 'Copy';
  copyBtn.classList.remove('copied');
  wrap.classList.add('visible');
  wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideCmdWrap() {
  document.getElementById('cmdWrap').classList.remove('visible');
  _lastCmd = '';
}

function copyCmd() {
  if (!_lastCmd) return;
  navigator.clipboard.writeText(_lastCmd).then(() => {
    const btn = document.getElementById('cmdCopyBtn');
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

document.getElementById('urlInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') fetchInfo();
});
