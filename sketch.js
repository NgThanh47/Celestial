let fromColor, toColor;
let randomStars = [];
let starSpeed = 0.5;

let starColors, starSizes;
let constellationStars = [];
let connections;
let connectionGradients;

let backgroundMusic;
let isMusicPlaying = false;

let hoveredStarColor;

let shootingStar;
let shootingStarVisible = false;
let shootingStarSpeed = { x: 35, y: 25 };

const referenceWidth = 1920;
const referenceHeight = 1080;

const highlightBrightnessFactor = 1.5;
const highlightSizeFactor = 1.2;

const constellationRanges = [
  { start: 0, end: 12 },  // Aquarius 
  { start: 13, end: 22 }, // Taurus
  { start: 23, end: 39 }, // Pices
  { start: 40, end: 61 },  // Sagittarius 
  { start: 62, end: 72 }, // Capricorn
  { start: 73, end: 80 }, // Libra
  { start: 81, end: 92 },  // Gemini 
  { start: 93, end: 97 }, // Cancer
  { start: 98, end: 101 }, // Aries
  { start: 102, end: 114 },  // Virgo 
  { start: 115, end: 129 }, // Scorpion
  { start: 130, end: 138 }, // Leo
];

const constellationNames = [
  "Aquarius", "Taurus", "Pisces", "Sagittarius", "Capricorn",
  "Libra", "Gemini", "Cancer", "Aries", "Virgo",
  "Scorpio", "Leo"
];

const constellationNamePositions = [
  { x: 0.158, y: 0.159 }, // Position for Aquarius
  { x: 0.420, y: 0.119 }, // Position for Taurus
  { x: 0.635, y: 0.2 }, // Position for Pices
  { x: 0.9, y: 0.195 }, // Position for Sagittarius
  { x: 0.710, y: 0.550 }, // Position for Capricorn
  { x: 0.9, y: 0.730 }, // Position for Libra
  { x: 0.68, y: 0.830 }, // Position for Gemini
  { x: 0.397, y: 0.828 }, // Position for Cancer
  { x: 0.460, y: 0.360 }, // Position for Aries
  { x: 0.3, y: 0.530 }, // Position for Virgo
  { x: 0.120, y: 0.432 }, // Position for Scorpion
  { x: 0.140, y: 0.945 }, // Position for Leo
];
// BACKGROUND MUSIC
function mouseClicked() {
  if (isMusicPlaying) {
    // If music is currently playing, stop it
    backgroundMusic.stop();
  } else {
    // If music is not playing, start it
    backgroundMusic.play();
  }
  // Toggle the music state
  isMusicPlaying = !isMusicPlaying;
}

function preload() {
  soundFormats('mp3', 'ogg');
  backgroundMusic = loadSound('Assets/Backgroundmusic.mp3');
}
// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundMusic.setVolume(1); // Set the volume (0.0 to 1.0)
  backgroundMusic.loop();

  hoveredConstellationIndex = -1;

  // Star colors
  starColors = [
    color(95, 217, 114, 170), // Green
    color(212, 119, 254, 170), // Pink
    color(107, 219, 255, 170), // Blue
  ];
  // Background color
  fromColor = color(0, 0, 20);
  toColor = color(30, 10, 50);

  // Gradient colors for star connections
  connectionGradients = {
    // Aquarius
    "0-1": [starColors[2], starColors[0]],
    "1-2": [starColors[1], starColors[2]],
    "2-3": [starColors[2], starColors[1]],
    "3-4": [starColors[1], starColors[2]],
    "4-5": [starColors[0], starColors[1]],
    "5-6": [starColors[2], starColors[0]],
    "6-7": [starColors[0], starColors[2]],
    "7-8": [starColors[1], starColors[0]],
    "8-9": [starColors[2], starColors[1]],
    "9-10": [starColors[1], starColors[2]],
    "2-11": [starColors[0], starColors[1]],
    "11-12": [starColors[2], starColors[1]],
    // Taurus
    "13-14": [starColors[2], starColors[1]],
    "14-15": [starColors[1], starColors[2]],
    "15-16": [starColors[1], starColors[0]],
    "16-17": [starColors[2], starColors[0]],
    "18-19": [starColors[0], starColors[2]],
    "19-20": [starColors[1], starColors[2]],
    "20-17": [starColors[2], starColors[1]],
    "17-21": [starColors[1], starColors[2]],
    "21-22": [starColors[2], starColors[1]],
    // Pices
    "23-24": [starColors[1], starColors[2]],
    "24-25": [starColors[2], starColors[1]],
    "25-26": [starColors[1], starColors[2]],
    "26-27": [starColors[0], starColors[1]],
    "27-28": [starColors[2], starColors[0]],
    "28-29": [starColors[0], starColors[2]],
    "29-30": [starColors[2], starColors[0]],
    "30-31": [starColors[1], starColors[2]],
    "31-32": [starColors[2], starColors[1]],
    "32-33": [starColors[0], starColors[2]],
    "33-34": [starColors[1], starColors[0]],
    "34-28": [starColors[2], starColors[1]],
    "23-35": [starColors[0], starColors[2]],
    "35-36": [starColors[2], starColors[0]],
    "36-37": [starColors[0], starColors[2]],
    "37-38": [starColors[1], starColors[0]],
    "38-39": [starColors[2], starColors[1]],
    // Sagittarius
    "40-42": [starColors[1], starColors[0]],
    "41-42": [starColors[1], starColors[0]],
    "42-43": [starColors[2], starColors[1]],
    "43-44": [starColors[1], starColors[2]],
    "44-45": [starColors[2], starColors[1]],
    "45-46": [starColors[0], starColors[2]],
    "46-47": [starColors[1], starColors[0]],
    "47-48": [starColors[2], starColors[1]],
    "48-49": [starColors[1], starColors[2]],
    "49-50": [starColors[0], starColors[1]],
    "50-51": [starColors[2], starColors[0]],
    "51-52": [starColors[1], starColors[2]],
    "52-53": [starColors[2], starColors[1]],
    "51-54": [starColors[2], starColors[0]],
    "49-55": [starColors[2], starColors[1]],
    "55-56": [starColors[0], starColors[2]],
    "55-57": [starColors[0], starColors[2]],
    "57-58": [starColors[2], starColors[0]],
    "58-59": [starColors[1], starColors[2]],
    "57-60": [starColors[2], starColors[0]],
    "60-61": [starColors[1], starColors[2]],
    // Capricorn
    "62-63": [starColors[1], starColors[2]],
    "63-64": [starColors[2], starColors[1]],
    "64-65": [starColors[1], starColors[2]],
    "65-66": [starColors[2], starColors[1]],
    "66-67": [starColors[1], starColors[2]],
    "67-68": [starColors[2], starColors[1]],
    "68-69": [starColors[0], starColors[2]],
    "69-70": [starColors[1], starColors[0]],
    "70-71": [starColors[2], starColors[1]],
    "71-72": [starColors[0], starColors[2]],
    "72-63": [starColors[1], starColors[0]],
    // Libra
    "73-74": [starColors[2], starColors[1]],
    "74-75": [starColors[0], starColors[2]],
    "75-76": [starColors[2], starColors[0]],
    "76-77": [starColors[1], starColors[2]],
    "73-75": [starColors[0], starColors[1]],
    "73-78": [starColors[0], starColors[1]],
    "78-79": [starColors[1], starColors[0]],
    "79-80": [starColors[2], starColors[1]],
    // Gemini
    "81-82": [starColors[2], starColors[1]],
    "82-83": [starColors[0], starColors[2]],
    "83-84": [starColors[2], starColors[0]],
    "84-85": [starColors[1], starColors[2]],
    "85-86": [starColors[0], starColors[1]],
    "86-87": [starColors[2], starColors[0]],
    "87-88": [starColors[1], starColors[2]],
    "88-89": [starColors[2], starColors[1]],
    "89-90": [starColors[0], starColors[2]],
    "90-91": [starColors[1], starColors[0]],
    "82-91": [starColors[1], starColors[2]],
    "91-92": [starColors[2], starColors[1]],
    // Cancer
    "93-95": [starColors[0], starColors[2]],
    "94-95": [starColors[0], starColors[1]],
    "95-96": [starColors[1], starColors[0]],
    "96-97": [starColors[2], starColors[1]],
    // Aries
    "98-99": [starColors[1], starColors[2]],
    "99-100": [starColors[0], starColors[1]],
    "100-101": [starColors[2], starColors[0]],
    // Virgo
    "102-103": [starColors[2], starColors[1]],
    "103-104": [starColors[0], starColors[2]],
    "104-105": [starColors[2], starColors[0]],
    "105-106": [starColors[0], starColors[2]],
    "106-107": [starColors[1], starColors[0]],
    "107-108": [starColors[2], starColors[1]],
    "105-109": [starColors[1], starColors[2]],
    "109-110": [starColors[2], starColors[1]],
    "110-113": [starColors[1], starColors[2]],
    "113-114": [starColors[2], starColors[1]],
    "110-111": [starColors[1], starColors[2]],
    "111-112": [starColors[0], starColors[1]],
    "106-111": [starColors[1], starColors[0]],
    // Scorpion
    "115-116": [starColors[1], starColors[2]],
    "116-117": [starColors[0], starColors[1]],
    "117-118": [starColors[2], starColors[0]],
    "116-119": [starColors[0], starColors[1]],
    "119-120": [starColors[2], starColors[0]],
    "120-121": [starColors[1], starColors[2]],
    "121-122": [starColors[2], starColors[1]],
    "122-123": [starColors[1], starColors[2]],
    "123-124": [starColors[0], starColors[1]],
    "124-125": [starColors[2], starColors[0]],
    "125-126": [starColors[1], starColors[2]],
    "126-127": [starColors[0], starColors[1]],
    "127-128": [starColors[2], starColors[0]],
    "128-129": [starColors[1], starColors[2]],
    // Leo
    "130-131": [starColors[2], starColors[1]],
    "131-132": [starColors[1], starColors[2]],
    "132-133": [starColors[0], starColors[1]],
    "133-134": [starColors[2], starColors[0]],
    "134-135": [starColors[0], starColors[2]],
    "135-136": [starColors[1], starColors[0]],
    "136-137": [starColors[0], starColors[1]],
    "137-138": [starColors[2], starColors[0]],
    "138-133": [starColors[0], starColors[2]],
  };
  connections = [
    // Aquarius
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 9],
    [9, 10],
    [2, 11],
    [11, 12],
    // Taurus
    [13, 14],
    [14, 15],
    [15, 16],
    [16, 17],
    [18, 19],
    [19, 20],
    [20, 17],
    [17, 21],
    [21, 22],
    // Pices
    [23, 24],
    [24, 25],
    [25, 26],
    [26, 27],
    [27, 28],
    [28, 29],
    [29, 30],
    [30, 31],
    [31, 32],
    [32, 33],
    [33, 34],
    [34, 28],
    [23, 35],
    [35, 36],
    [36, 37],
    [37, 38],
    [38, 39],
    // Sagittarius
    [40, 42],
    [41, 42],
    [42, 43],
    [43, 44],
    [44, 45],
    [45, 46],
    [46, 47],
    [47, 48],
    [48, 49],
    [49, 50],
    [50, 51],
    [51, 52],
    [52, 53],
    [51, 54],
    [49, 55],
    [55, 56],
    [55, 57],
    [57, 58],
    [58, 59],
    [57, 60],
    [60, 61],
    // Aquarius
    [62, 63],
    [63, 64],
    [64, 65],
    [65, 66],
    [66, 67],
    [67, 68],
    [68, 69],
    [69, 70],
    [70, 71],
    [71, 72],
    [72, 63],
    // Libra
    [73, 74],
    [74, 75],
    [75, 76],
    [76, 77],
    [73, 75],
    [73, 78],
    [78, 79],
    [79, 80],
    // Gemini
    [81, 82],
    [82, 83],
    [83, 84],
    [84, 85],
    [85, 86],
    [86, 87],
    [87, 88],
    [88, 89],
    [89, 90],
    [90, 91],
    [82, 91],
    [91, 92],
    // Cancer
    [93, 95],
    [94, 95],
    [95, 96],
    [96, 97],
    // Aries
    [98, 99],
    [99, 100],
    [100, 101],
    // Virgo
    [102, 103],
    [103, 104],
    [104, 105],
    [105, 106],
    [106, 107],
    [107, 108],
    [105, 109],
    [109, 110],
    [110, 113],
    [113, 114],
    [110, 111],
    [111, 112],
    [106, 111],
    // Scorpion
    [115, 116],
    [116, 117],
    [117, 118],
    [116, 119],
    [119, 120],
    [120, 121],
    [121, 122],
    [122, 123],
    [123, 124],
    [124, 125],
    [125, 126],
    [126, 127],
    [127, 128],
    [128, 129],
    // Leo
    [130, 131],
    [131, 132],
    [132, 133],
    [133, 134],
    [134, 135],
    [135, 136],
    [136, 137],
    [137, 138],
    [138, 133],
  ];

  starSizes = [10, 15, 20, 25, 30];

  // Stars position, size, color, opacity 
  constellationStars = [
    // Aquarius
    { x: referenceWidth * 0.226, y: referenceHeight * 0.048, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 10) }, //0
    { x: referenceWidth * 0.143, y: referenceHeight * 0.1, size: starSizes[4], color: starColors[2], baseOpacity: random(2, 5) }, //1
    { x: referenceWidth * 0.069, y: referenceHeight * 0.137, size: starSizes[3], color: starColors[1], baseOpacity: random(2, 5) }, //2
    { x: referenceWidth * 0.057, y: referenceHeight * 0.205, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //3
    { x: referenceWidth * 0.039, y: referenceHeight * 0.194, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //4
    { x: referenceWidth * 0.028, y: referenceHeight * 0.226, size: starSizes[3], color: starColors[0], baseOpacity: random(2, 5) }, //5
    { x: referenceWidth * 0.057, y: referenceHeight * 0.387, size: starSizes[3], color: starColors[2], baseOpacity: random(2, 5) }, //6
    { x: referenceWidth * 0.078, y: referenceHeight * 0.331, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //7
    { x: referenceWidth * 0.12, y: referenceHeight * 0.321, size: starSizes[3], color: starColors[1], baseOpacity: random(2, 5) }, //8
    { x: referenceWidth * 0.126, y: referenceHeight * 0.374, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //9
    { x: referenceWidth * 0.152, y: referenceHeight * 0.421, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //10
    { x: referenceWidth * 0.113, y: referenceHeight * 0.223, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //11
    { x: referenceWidth * 0.165, y: referenceHeight * 0.231, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //12

    // Taurus
    { x: referenceWidth * 0.269, y: referenceHeight * 0.055, size: starSizes[3], color: starColors[1], baseOpacity: random(2, 5) }, //13
    { x: referenceWidth * 0.333, y: referenceHeight * 0.093, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //14
    { x: referenceWidth * 0.365, y: referenceHeight * 0.14, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //15
    { x: referenceWidth * 0.387, y: referenceHeight * 0.158, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //16
    { x: referenceWidth * 0.403, y: referenceHeight * 0.182, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //17
    { x: referenceWidth * 0.266, y: referenceHeight * 0.164, size: starSizes[3], color: starColors[0], baseOpacity: random(2, 5) }, //18
    { x: referenceWidth * 0.364, y: referenceHeight * 0.2, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //19
    { x: referenceWidth * 0.382, y: referenceHeight * 0.19, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //20
    { x: referenceWidth * 0.434, y: referenceHeight * 0.185, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //21
    { x: referenceWidth * 0.519, y: referenceHeight * 0.193, size: starSizes[4], color: starColors[2], baseOpacity: random(2, 5) }, //22

    // Pices
    { x: referenceWidth * 0.545, y: referenceHeight * 0.045, size: starSizes[3], color: starColors[2], baseOpacity: random(2, 5) }, //23
    { x: referenceWidth * 0.597, y: referenceHeight * 0.083, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //24
    { x: referenceWidth * 0.635, y: referenceHeight * 0.109, size: starSizes[3], color: starColors[2], baseOpacity: random(2, 5) }, //25
    { x: referenceWidth * 0.665, y: referenceHeight * 0.111, size: starSizes[2], color: starColors[1], baseOpacity: random(2, 5) }, //26
    { x: referenceWidth * 0.734, y: referenceHeight * 0.110, size: starSizes[2], color: starColors[0], baseOpacity: random(2, 5) }, //27
    { x: referenceWidth * 0.760, y: referenceHeight * 0.104, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //28
    { x: referenceWidth * 0.782, y: referenceHeight * 0.12, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //29
    { x: referenceWidth * 0.797, y: referenceHeight * 0.093, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //30
    { x: referenceWidth * 0.803, y: referenceHeight * 0.062, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //31
    { x: referenceWidth * 0.785, y: referenceHeight * 0.037, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //32
    { x: referenceWidth * 0.76, y: referenceHeight * 0.042, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //33
    { x: referenceWidth * 0.751, y: referenceHeight * 0.07, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //34
    { x: referenceWidth * 0.572, y: referenceHeight * 0.114, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //35
    { x: referenceWidth * 0.589, y: referenceHeight * 0.192, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //36
    { x: referenceWidth * 0.615, y: referenceHeight * 0.289, size: starSizes[4], color: starColors[0], baseOpacity: random(2, 5) }, //37
    { x: referenceWidth * 0.602, y: referenceHeight * 0.332, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //38
    { x: referenceWidth * 0.627, y: referenceHeight * 0.354, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //39

    //Sagittarius
    { x: referenceWidth * 0.855, y: referenceHeight * 0.072, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //40
    { x: referenceWidth * 0.866, y: referenceHeight * 0.121, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //41
    { x: referenceWidth * 0.895, y: referenceHeight * 0.07, size: starSizes[3], color: starColors[1], baseOpacity: random(2, 5) }, //42
    { x: referenceWidth * 0.922, y: referenceHeight * 0.128, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //43
    { x: referenceWidth * 0.973, y: referenceHeight * 0.206, size: starSizes[3], color: starColors[1], baseOpacity: random(2, 5) }, //44
    { x: referenceWidth * 0.956, y: referenceHeight * 0.255, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //45
    { x: referenceWidth * 0.934, y: referenceHeight * 0.312, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //46
    { x: referenceWidth * 0.889, y: referenceHeight * 0.294, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //47
    { x: referenceWidth * 0.858, y: referenceHeight * 0.251, size: starSizes[3], color: starColors[2], baseOpacity: random(2, 5) }, //48
    { x: referenceWidth * 0.836, y: referenceHeight * 0.316, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //49
    { x: referenceWidth * 0.863, y: referenceHeight * 0.326, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //50
    { x: referenceWidth * 0.882, y: referenceHeight * 0.375, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //51
    { x: referenceWidth * 0.905, y: referenceHeight * 0.381, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //52
    { x: referenceWidth * 0.936, y: referenceHeight * 0.417, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //53
    { x: referenceWidth * 0.876, y: referenceHeight * 0.412, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //54
    { x: referenceWidth * 0.815, y: referenceHeight * 0.351, size: starSizes[3], color: starColors[2], baseOpacity: random(2, 5) }, //55
    { x: referenceWidth * 0.801, y: referenceHeight * 0.428, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //56
    { x: referenceWidth * 0.794, y: referenceHeight * 0.304, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //57
    { x: referenceWidth * 0.799, y: referenceHeight * 0.242, size: starSizes[4], color: starColors[2], baseOpacity: random(2, 5) }, //58
    { x: referenceWidth * 0.778, y: referenceHeight * 0.212, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //59
    { x: referenceWidth * 0.762, y: referenceHeight * 0.304, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //60
    { x: referenceWidth * 0.731, y: referenceHeight * 0.365, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //61

    // Capricorn
    { x: referenceWidth * 0.857, y: referenceHeight * 0.476, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //62
    { x: referenceWidth * 0.826, y: referenceHeight * 0.495, size: starSizes[4], color: starColors[1], baseOpacity: random(2, 5) }, //63
    { x: referenceWidth * 0.699, y: referenceHeight * 0.487, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //64
    { x: referenceWidth * 0.666, y: referenceHeight * 0.454, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //65
    { x: referenceWidth * 0.631, y: referenceHeight * 0.428, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //66
    { x: referenceWidth * 0.595, y: referenceHeight * 0.426, size: starSizes[3], color: starColors[1], baseOpacity: random(2, 5) }, //67
    { x: referenceWidth * 0.625, y: referenceHeight * 0.481, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //68
    { x: referenceWidth * 0.642, y: referenceHeight * 0.545, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //69
    { x: referenceWidth * 0.682, y: referenceHeight * 0.611, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //70
    { x: referenceWidth * 0.695, y: referenceHeight * 0.658, size: starSizes[3], color: starColors[2], baseOpacity: random(2, 5) }, //71
    { x: referenceWidth * 0.727, y: referenceHeight * 0.632, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //72
    // Libra
    { x: referenceWidth * 0.882, y: referenceHeight * 0.537, size: starSizes[3], color: starColors[1], baseOpacity: random(2, 5) }, //73
    { x: referenceWidth * 0.962, y: referenceHeight * 0.617, size: starSizes[3], color: starColors[2], baseOpacity: random(2, 5) }, //74
    { x: referenceWidth * 0.967, y: referenceHeight * 0.799, size: starSizes[3], color: starColors[0], baseOpacity: random(2, 5) }, //75
    { x: referenceWidth * 0.916, y: referenceHeight * 0.858, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //76
    { x: referenceWidth * 0.921, y: referenceHeight * 0.926, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //77
    { x: referenceWidth * 0.866, y: referenceHeight * 0.666, size: starSizes[2], color: starColors[0], baseOpacity: random(2, 5) }, //78
    { x: referenceWidth * 0.856, y: referenceHeight * 0.711, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //79
    { x: referenceWidth * 0.835, y: referenceHeight * 0.748, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //80
    // Gemini
    { x: referenceWidth * 0.817, y: referenceHeight * 0.659, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //81
    { x: referenceWidth * 0.785, y: referenceHeight * 0.708, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //82
    { x: referenceWidth * 0.735, y: referenceHeight * 0.730, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //83
    { x: referenceWidth * 0.630, y: referenceHeight * 0.759, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //84
    { x: referenceWidth * 0.590, y: referenceHeight * 0.747, size: starSizes[3], color: starColors[1], baseOpacity: random(2, 5) }, //85
    { x: referenceWidth * 0.578, y: referenceHeight * 0.820, size: starSizes[4], color: starColors[0], baseOpacity: random(2, 5) }, //86
    { x: referenceWidth * 0.583, y: referenceHeight * 0.910, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //87
    { x: referenceWidth * 0.613, y: referenceHeight * 0.958, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //88
    { x: referenceWidth * 0.680, y: referenceHeight * 0.924, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //89
    { x: referenceWidth * 0.720, y: referenceHeight * 0.899, size: starSizes[2], color: starColors[0], baseOpacity: random(2, 5) }, //90
    { x: referenceWidth * 0.815, y: referenceHeight * 0.841, size: starSizes[4], color: starColors[1], baseOpacity: random(2, 5) }, //91
    { x: referenceWidth * 0.834, y: referenceHeight * 0.936, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //92
    // Cancer
    { x: referenceWidth * 0.535, y: referenceHeight * 0.581, size: starSizes[4], color: starColors[2], baseOpacity: random(2, 5) }, //93
    { x: referenceWidth * 0.528, y: referenceHeight * 0.945, size: starSizes[3], color: starColors[1], baseOpacity: random(2, 5) }, //94
    { x: referenceWidth * 0.443, y: referenceHeight * 0.875, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //95
    { x: referenceWidth * 0.4, y: referenceHeight * 0.889, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //96
    { x: referenceWidth * 0.327, y: referenceHeight * 0.931, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //97
    // Aries
    { x: referenceWidth * 0.396, y: referenceHeight * 0.261, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //98
    { x: referenceWidth * 0.396, y: referenceHeight * 0.331, size: starSizes[2], color: starColors[1], baseOpacity: random(2, 5) }, //99
    { x: referenceWidth * 0.443, y: referenceHeight * 0.399, size: starSizes[3], color: starColors[0], baseOpacity: random(2, 5) }, //100
    { x: referenceWidth * 0.557, y: referenceHeight * 0.518, size: starSizes[3], color: starColors[2], baseOpacity: random(2, 5) }, //101
    // Virgo
    { x: referenceWidth * 0.465, y: referenceHeight * 0.604, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //102
    { x: referenceWidth * 0.426, y: referenceHeight * 0.592, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //103
    { x: referenceWidth * 0.43, y: referenceHeight * 0.553, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //104
    { x: referenceWidth * 0.368, y: referenceHeight * 0.511, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //105
    { x: referenceWidth * 0.362, y: referenceHeight * 0.632, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //106
    { x: referenceWidth * 0.389, y: referenceHeight * 0.680, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //107
    { x: referenceWidth * 0.454, y: referenceHeight * 0.715, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //108
    { x: referenceWidth * 0.336, y: referenceHeight * 0.565, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //109
    { x: referenceWidth * 0.285, y: referenceHeight * 0.596, size: starSizes[2], color: starColors[2], baseOpacity: random(2, 5) }, //110
    { x: referenceWidth * 0.304, y: referenceHeight * 0.656, size: starSizes[4], color: starColors[1], baseOpacity: random(2, 5) }, //111
    { x: referenceWidth * 0.297, y: referenceHeight * 0.747, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //112
    { x: referenceWidth * 0.251, y: referenceHeight * 0.594, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //113
    { x: referenceWidth * 0.213, y: referenceHeight * 0.604, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //114
    // Scorpion
    { x: referenceWidth * 0.274, y: referenceHeight * 0.285, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //115
    { x: referenceWidth * 0.285, y: referenceHeight * 0.341, size: starSizes[4], color: starColors[1], baseOpacity: random(2, 5) }, //116
    { x: referenceWidth * 0.289, y: referenceHeight * 0.394, size: starSizes[0], color: starColors[0], baseOpacity: random(2, 5) }, //117
    { x: referenceWidth * 0.28, y: referenceHeight * 0.454, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //118
    { x: referenceWidth * 0.245, y: referenceHeight * 0.365, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //119
    { x: referenceWidth * 0.220, y: referenceHeight * 0.380, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //120
    { x: referenceWidth * 0.203, y: referenceHeight * 0.412, size: starSizes[1], color: starColors[1], baseOpacity: random(2, 5) }, //121
    { x: referenceWidth * 0.178, y: referenceHeight * 0.491, size: starSizes[4], color: starColors[2], baseOpacity: random(2, 5) }, //122
    { x: referenceWidth * 0.174, y: referenceHeight * 0.556, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //123
    { x: referenceWidth * 0.165, y: referenceHeight * 0.612, size: starSizes[1], color: starColors[0], baseOpacity: random(2, 5) }, //124
    { x: referenceWidth * 0.130, y: referenceHeight * 0.622, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //125
    { x: referenceWidth * 0.096, y: referenceHeight * 0.619, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //126
    { x: referenceWidth * 0.066, y: referenceHeight * 0.577, size: starSizes[2], color: starColors[0], baseOpacity: random(2, 5) }, //127
    { x: referenceWidth * 0.084, y: referenceHeight * 0.538, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //128
    { x: referenceWidth * 0.1, y: referenceHeight * 0.506, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //129
    // Leo
    { x: referenceWidth * 0.034, y: referenceHeight * 0.902, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //130
    { x: referenceWidth * 0.049, y: referenceHeight * 0.945, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //131
    { x: referenceWidth * 0.100, y: referenceHeight * 0.914, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //132
    { x: referenceWidth * 0.114, y: referenceHeight * 0.870, size: starSizes[2], color: starColors[0], baseOpacity: random(2, 5) }, //133
    { x: referenceWidth * 0.207, y: referenceHeight * 0.916, size: starSizes[1], color: starColors[2], baseOpacity: random(2, 5) }, //134
    { x: referenceWidth * 0.288, y: referenceHeight * 0.870, size: starSizes[4], color: starColors[0], baseOpacity: random(2, 5) }, //135
    { x: referenceWidth * 0.230, y: referenceHeight * 0.836, size: starSizes[0], color: starColors[1], baseOpacity: random(2, 5) }, //136
    { x: referenceWidth * 0.104, y: referenceHeight * 0.736, size: starSizes[4], color: starColors[0], baseOpacity: random(2, 5) }, //137
    { x: referenceWidth * 0.093, y: referenceHeight * 0.808, size: starSizes[0], color: starColors[2], baseOpacity: random(2, 5) }, //138
  ];
  prepareRandomStars();
}
// DRAW
function draw() {
  clear();
  drawGradientBackground();
  drawRandomStars();
  updateShootingStar();
  drawShootingStar();
  drawConstellations();
  checkForHoveredStar();
  if (hoveredConstellationIndex !== -1) {
    highlightConstellation(hoveredConstellationIndex); // Highlight the hovered constellation
    drawConstellationName(hoveredConstellationIndex); // Draw the constellation name when hovering
  }
  // Occasionally initialize a new shooting star
  if (random() < 0.005) {
    initializeShootingStar();
  }
}

// RESPONSIVE WEB
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawRandomStars();
  drawConstellations();
}
// GRADIENT BACKGROUND
function drawGradientBackground() {
  noSmooth(); // Disable anti-aliasing
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(fromColor, toColor, inter);
    fill(c); // Use fill instead of stroke
    noStroke(); // Disable stroke
    rect(0, i, width, 1); // Draw a rectangle that is 1 pixel high
  }
}
// BACKGROUND RANDOM STAR
function prepareRandomStars() {
  randomStars = [];
  for (let i = 0; i < 500; i++) {
    randomStars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      brightness: random(150, 200)
    });
  }
}
function drawRandomStars() {
  noStroke(); // Set no stroke for all stars
  for (let star of randomStars) {
    fill(star.brightness);
    ellipse(star.x, star.y, star.size, star.size);

    // Move the star vertically
    star.y += starSpeed;

    // Reset star position if it goes off the bottom
    if (star.y > height) {
      star.y = -star.size; // Reset star above the top
    }
  }
}
// DRAW CONSTELLATIONS at default
function drawConstellations() {
  let scaleFactor = min(width / referenceWidth, height / referenceHeight);
  let baseBrightnessFactor = 0.07; // non-hovered constellations

  for (let i = 0; i < constellationStars.length; i++) {
    let star = constellationStars[i];
    let scaledSize = star.size * scaleFactor;
    let glowSteps = 10;
    let isHoveredConstellation = hoveredConstellationIndex === findConstellationIndex(i);
    let brightnessFactor = isHoveredConstellation ? 1 : baseBrightnessFactor;

    // Bright dot inside star
    for (let j = glowSteps; j > 0; j--) {
      let glowAlpha = 255 * (1 - j / glowSteps) * star.baseOpacity * brightnessFactor;
      let glowColor = color(red(star.color), green(star.color), blue(star.color), glowAlpha);

      stroke(glowColor);
      strokeWeight(random(4, 8)* scaleFactor); // Flicker the star
      circle(star.x * scaleFactor, star.y * scaleFactor, 0.1);
    }

    // Star
    let starColor = color(red(star.color), green(star.color), blue(star.color), alpha(star.color) * star.baseOpacity * brightnessFactor);
    fill(starColor);
    noStroke();
    circle(star.x * scaleFactor, star.y * scaleFactor, 13 * scaleFactor);
  }
}
// DRAW CONSTELLATION CONNECTIONS
function drawGradientLine(x1, y1, x2, y2, gradientColors) {
  let steps = 300; 

  // Pre-calculate the step values to reduce calculations inside the loop
  let stepX = (x2 - x1) / steps;
  let stepY = (y2 - y1) / steps;

  for (let i = 0; i < steps; i++) {
    // Calculate the start and end points of each small line segment
    let startX = x1 + i * stepX;
    let startY = y1 + i * stepY;
    let endX = startX + stepX;
    let endY = startY + stepY;

    // Lerp color at the start of the current segment
    let c = lerpColor(gradientColors[0], gradientColors[1], i / steps);
    stroke(c);
    strokeWeight(2);
    line(startX, startY, endX, endY);
  }
}
// HOVER THE STAR
function checkForHoveredStar() {
  hoveredConstellationIndex = -1; // Reset to no hover
  for (let i = 0; i < constellationStars.length; i++) {
    let star = constellationStars[i];
    let d = dist(mouseX, mouseY, star.x * (width / referenceWidth), star.y * (height / referenceHeight));
    if (d < star.size / 2) {
      hoveredConstellationIndex = findConstellationIndex(i);
      break;
    }
  }
}
// HIGHLIGHT THE CONSTELLATION
function findConstellationIndex(starIndex) {
  // Check which range the starIndex falls into
  for (let i = 0; i < constellationRanges.length; i++) {
    if (starIndex >= constellationRanges[i].start && starIndex <= constellationRanges[i].end) {
      return i; // Return the index of the constellation
    }
  }
  return -1; // Return -1 if the star does not belong to any constellation
}
function highlightConstellation(index) {
  let highlightBrightnessFactor = 2;
  let highlightSizeFactor = 1;
  let scaleFactor = min(windowWidth / referenceWidth, windowHeight / referenceHeight);
  const range = constellationRanges[index];
  // Draw connections when hovering
  for (let [startIdx, endIdx] of connections) {
    if (startIdx >= range.start && endIdx <= range.end) {
      let startStar = constellationStars[startIdx];
      let endStar = constellationStars[endIdx];
      let scaledStartX = startStar.x * scaleFactor;
      let scaledStartY = startStar.y * scaleFactor;
      let scaledEndX = endStar.x * scaleFactor;
      let scaledEndY = endStar.y * scaleFactor;

      let gradientKey = `${startIdx}-${endIdx}`;
      let gradientColors = connectionGradients[gradientKey];
      let brighterGradientColors = gradientColors.map(c => color(red(c), green(c), blue(c), alpha(c) * highlightBrightnessFactor));

      drawGradientLine(scaledStartX, scaledStartY, scaledEndX, scaledEndY, brighterGradientColors);
    }
  }
  // Highlight stars
  for (let i = range.start; i <= range.end; i++) {
    let star = constellationStars[i];
    let scaledSize = star.size * scaleFactor * highlightSizeFactor;

  // Calculate the brighterColor for each star
    let brighterColor = color(red(star.color), green(star.color), blue(star.color), alpha(star.color) * highlightBrightnessFactor);

    for (let j = 20; j > 0; j--) {
      let glowSize = scaledSize + j / 0;
      stroke(brighterColor);
      strokeWeight(glowSize);
      circle(star.x * scaleFactor, star.y * scaleFactor, 1);
    }

    fill(brighterColor);
    noStroke();
    circle(star.x * scaleFactor, star.y * scaleFactor, scaledSize);
  }
}
// DRAW CONSTELLATION NAMES
// The color of name is based on the star color which is hovered
function checkForHoveredStar() {
  hoveredConstellationIndex = -1; // Reset to no hover
  for (let i = 0; i < constellationStars.length; i++) {
    let star = constellationStars[i];
    let d = dist(mouseX, mouseY, star.x * (width / referenceWidth), star.y * (height / referenceHeight));
    if (d < star.size / 2) {
      hoveredConstellationIndex = findConstellationIndex(i);
      hoveredStarColor = star.color; // Set the color of the hovered star
      break;
    }
  }
}
// Draw the constellation name
function drawConstellationName(index) {
  if (index >= 0 && index < constellationNames.length) {
    const name = constellationNames[index];
    const position = constellationNamePositions[index];

    let scaleFactor = min(width / referenceWidth, height / referenceHeight);
    let posX = position.x * referenceWidth * scaleFactor;
    let posY = position.y * referenceHeight * scaleFactor;

    let scaledTextSize = 22 * scaleFactor;

    textSize(scaledTextSize);
    textFont('Lora');
    textAlign(CENTER, CENTER);

    // Check if the constellation is hovered to make the name brighter
    let textColor;
    if (hoveredConstellationIndex === index) {
      // Brighten the color for hovered constellation
      textColor = color(red(hoveredStarColor), green(hoveredStarColor), blue(hoveredStarColor), 255); // Maximum brightness
    } else {
      // Normal color for non-hovered constellations
      textColor = hoveredStarColor;
    }

    fill(textColor);
    text(name, posX, posY);
  }
}
// SHOOTING STAR
// Initialize the Shooting Star
function initializeShootingStar() {
  let scaleFactor = min(width / referenceWidth, height / referenceHeight);
  shootingStar = {
    x: random(-50, width / 2),
    y: random(-50, height / 4),
    size: scaleFactor // Add a size property for scaling
  };
  shootingStarVisible = true;
}

function updateShootingStar() {
  if (!shootingStarVisible) return;

  let scaleFactor = min(width / referenceWidth, height / referenceHeight);
  let scaledSpeedX = shootingStarSpeed.x * scaleFactor;
  let scaledSpeedY = shootingStarSpeed.y * scaleFactor;

  // Move the shooting star
  shootingStar.x += scaledSpeedX;
  shootingStar.y += scaledSpeedY;

  // Check if shooting star is out of bounds
  if (shootingStar.x > width || shootingStar.y > height) {
    shootingStarVisible = false;
  }
}

function drawShootingStar() {
  if (!shootingStarVisible) return;

  let scaleFactor = min(width / referenceWidth, height / referenceHeight);
  let tailLength = 40 * scaleFactor; // Scale the tail length

  // Draw the tail with a gradient effect
  for (let i = 0; i < tailLength; i++) {
    let alpha = map(i, 0, tailLength, 255, 0);
    stroke(255, 250, 170, alpha); 
    strokeWeight(5 * scaleFactor); // Scale the stroke weight
    line(shootingStar.x - i * (shootingStarSpeed.x / 2) * scaleFactor,
         shootingStar.y - i * (shootingStarSpeed.y / 2) * scaleFactor, 
         shootingStar.x - (i + 1) * (shootingStarSpeed.x / 2) * scaleFactor, 
         shootingStar.y - (i + 1) * (shootingStarSpeed.y / 2) * scaleFactor);
  }
}
