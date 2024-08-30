const imageScrambles = {
  A: [
    "L' U2 L U L' U L",
    "U' R' U R U' R' F R' F' R2 U R' U' R",
    "L' U2 L U2 L F' L' F",
    "U2 R U' R' F R' F' R",
    "R' F U2 R U R' U2 R' F' R2 U2",
    "U2 F R' F' R U2 R U2 R'",
  ],
  F: [
    "R U R' U' R' F R2 U' R' U' R U R' F'",
    "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    "",
  ],
  H: [
    "R2 U2 R' U2 R2",
    "F U R U' R' U R U' R' U R U' R' F'",
    "R' F R F' R U' R' U' R U' R'",
    "U' F R2 U' R2 U R2 U R2 F'",
  ],
  L: [
    "U2 R' F' R U R U' R' F U'",
    "R U R' U' R' F R F'",
    "R U2 R' F R' F' R2 U2 R'",
    "U' R2 U R' U' R U R' U2 R U' R U'",
    "U2 F R' F2 R U' R' F2 R2 U2 R' U'",
    "R' U2 R U R2 F' R U R U' R' F R U",
  ],
  P: [
    "R U' R2 U R2 U R2 U' R",
    "U R' U2 R U R' F R' F' R U R U",
    "R' F' R U' R' F' R F' R U R'",
    "F R2 U' R2 U' R2 U R2 F' U'",
    "F R' F' R U2 R U' R' U R U2 R'",
    "U' R U2 R' U' R U R' U2 R' F R F' U'",
  ],
  S: [
    "R U2 R' U' R U' R'",
    "R2 U R U2 R' F R2 F' R U",
    "R U2 R' U2 R' F R F'",
    "U2 L' U L F' R U R'",
    "U' R U R2 F' R F R U' R2 F R U'",
    "U2 F' L F L' U2 L' U2 L",
  ],
  T: [
    "F R' F' R U R U' R'",
    "U' R U R U' R' F R' F'",
    "R U' R' F2 U R U2 R' U F' U'",
    "U R U R2 U' R U2 R' U2 R U' R U",
    "F R U' R' U R U R' U R U' R' F' U",
    "U' R' F R' F' R2 U2 R' U' R U'",
  ],
  U: [
    "F U R U' R' F'",
    "R' U R' U2 R U2 R' U R2 U' R' U",
    "F' R U R' F U2 R U' R' F' U",
    "R U R' U2 R U R' U R' F R F'",
    "R U' R' U R U' R' F R' F' R2 U R' U'",
    "R' U' R U2 R' F R' F' R U' R U'",
  ],
};

export const generateCubeUrl = (alg, size = 150) => {
  const baseUrl = "https://visualcube.api.cubing.net/visualcube.php";
  const params = new URLSearchParams({
    fmt: 'svg',  // Using SVG for better quality and scalability
    size,        // Adjust size as needed
    pzl: '2',    // Puzzle type for 2x2
    view: 'plan', // Optional, for a flat view
    bg: 't',      // Setting background to transparent
    alg,         // Algorithm that represents the case visually
  });
  return `${baseUrl}?${params.toString()}`;
};

const getUrlForCase = (group, caseId) => {
  return generateCubeUrl(imageScrambles[group][caseId - 1]); // Adjust index since caseId starts from 1
};

export const scrambles = {
  CLL: {
    A: [
      {
        caseId: 1,
        url: getUrlForCase('A', 1),
        algs: [
          "R' F' R U' R' F2 R",
          "R' U' F' U F R F U R U' R' F'",
          "R' F' U' F U R F R U R' U' F'",
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('A', 2),
        algs: [
          "R' F R F' R U R' F R' F' R U R U' R'",
          "R U' R' U F' U' R' F R U' F",
          "R U R' F' R U2 R' U' R U' R' F R U' R'",
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('A', 3),
        algs: [
          "R' F R F' R U2 R' U' R' F R F'",
          "F' R U R' U2 R' F2 R",
          "F R U R' U' F2 R U R' U' R' F R",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('A', 4),
        algs: [
          "F R' F' R U R U' R' F' R U R' U' R' F R",
          "F R' F' U2 R' U2 R F2 U2 F U2 F2",
          "F R' F' U2 R' U2 R F2 U2 F' U2 F2",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('A', 5),
        algs: [
          "R U R2 F' R F R U' R2 F R",
          "R' F U2 F' R F R' U2 R F'",
          "F U R' F' R U' F' U R' F R F'"          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('A', 6),
        algs: [
          "F R2 F' U' R' U' R F R' F'",
          "R U R' U' R' F R2 U R' U' F'",
          "R U R U' R' F R' F' R' U R F' U F R'",          
        ]
      },
    ],
    F: [
      {
        caseId: 1,
        url: getUrlForCase('F', 1),
        algs: [
          "R' F R' F2 R U' R' F2 R2", 
          "R2 F2 R U R' F2 R F' R", 
          "R' U R' F2 R F' R' F2 R2",  
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('F', 2),
        algs: [
          "R' U R' F2 R F' U R' F2 R F' R", 
          "R U' R' U' F2 U' R U R' U F2", 
          "R' F R' F2 R U' F R' F2 R U' R",  
        ]
      },
    ],
    H: [
      {
        caseId: 1,
        url: getUrlForCase('H', 1),
        algs: [
          "R' F2 R U R' F' R U R' F R",
          "R' U2 R U2 F R F' R' F R F' R U R'",
          "R' F' R U' R' F2 R F U' R U' R' U R' F R F2"
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('H', 2),
        algs: [
          "R U' R' F R' F' R2 U' R' F R' F' R",
          "R' F R F' R U R2 F R F' R U R'",
          "R2 F' U2 F2 R2 F' R2",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('H', 3),
        algs: [
          "R' F' R U' R' F' R F' R U R'",
          "R U' R' F U2 R2 F R U' R",
          "F R' F' R U2 F2 R U R' F",           
        ]
      },{
        caseId: 4,
        url: getUrlForCase('H', 4),
        algs: [
          "F R U' R' U R U2 R' U' R U R' U' F'",
          "F R U R' U' R F' R U R' U' R'",
          "F R2 F' R U' R U R' U R'",          
        ]
      },
    ],
    L: [
      {
        caseId: 1,
        url: getUrlForCase('L', 1),
        algs: [
          "F R U' R' U' R U R' F'",
          "F R F U' R' U F' R'",
          "R U R U' R' F R' F'",          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('L', 2),
        algs: [
          "F' U R U' R' F2 R U' R'", 
          "R U R' U R U' R' U' R' F R F'",
          "F R U R' U' R' F' R U2 R U2 R'",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('L', 3),
        algs: [
          "R' U' R U R' F' R U R' U' R' F R2",
          "R' F2 R F' R' F2 R2 U' R'",
          "R' F2 R F' R U R2 F2 R",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('L', 4),
        algs: [
          "F U' R U' R' U R' F R F2",
          "R' F' R U' R' F R U' R' F R U' R' F2 R",
          "F' U2 R' F' R U' F R' F R F'",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('L', 5),
        algs: [
          "R U' R' U R U' R' F R' F' R2 U R'",
          "R' U2 R' U' F R2 F' U R2",
          "R' F2 R2 U2 R' U R' F2 R F'",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('L', 6),
        algs: [
          "R U R2 F' R U R U' R2 F' R F",
          "R U' R' F U2 F U' R U' R' F'",
          "R' U' R U2 R' F R' F' R U' R",          
        ]
      },
    ],
    P: [
      {
        caseId: 1,
        url: getUrlForCase('P', 1),
        algs: [
          "R' F' U' F U F' U' F U R",
          "F R' F' U2 R' U2 R2 U' R' F R' F' R",
          "R' U' F' U F R F R U' R' U2 R U R' F'"          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('P', 2),
        algs: [
          "R2 U R' U' F R F' R U' R2",
          "F R U R' U' F' R2 U2 R' U2 R2",
          "R' U2 R U R' F R' F' R U R",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('P', 3),
        algs: [
          "R U' R' F R' F R U R' F R",
          "R' U' R U' R' U2 F' R U R U' R' F",
          "R' F R F' R U' R' U' R U' R'",           
        ]
      },{
        caseId: 4,
        url: getUrlForCase('P', 4),
        algs: [
          "R U' R U' R' U R' F R2 F'",
          "F R' F' R U2 F R' F' R2 U2 R'",
          "F' R U R' U2 F' R U R2 F2 R",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('P', 5),
        algs: [
          "F' R U R' U2 R' F R U' R' F2 R",
          "R2 U' R' U' F R2 U2 F' R2 F",
          "R' U2 R U R' U R2 U' R' F R' F' R",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('P', 6),
        algs: [
          "R' F2 R F' U2 R U' R' U' F",
          "F U R U' R' U R U' R2 F' R U R U' R'",
          "F U' R' F2 R U' F2 R U2 R'",          
        ]
      },
    ],
    S: [
      {
        caseId: 1,
        url: getUrlForCase('S', 1),
        algs: [
          "R' F2 R U R' F R",
          "F R U R' U' F' R' F' U' F U R",
          "F U R U' R' F' R' U' F' U F R"          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('S', 2),
        algs: [
          "R' U R U' R' F R' F' R2 U R' U' R",
          "R' F R U' F U R U' R' U F'",
          "R' F R2 F' U' R' U' R2 U R'",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('S', 3),
        algs: [
          "R U' R' F R' F2 R U R U' R' F",
          "F R' F' R U R U' R' F' U2 F U F' U F",
          "R U R' U' R' F R F' R2 U2 R U2 R2",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('S', 4),
        algs: [
          "F U' F' R U' R' F",
          "R U R' U' R' F R F' R' F' R U R U' R' F",
          "R' U2 R U2 F R2 F' R U R' U' R'",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('S', 5),
        algs: [
          "R U2 R' F R U2 R' U R U' R' F",
          "R2 F' U' R2 F R2 U F R2",
          "R' F' R2 U R' F' R' F R2 U' R'",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('S', 6),
        algs: [
          "F U R U2 R' U' R U R' F'",
          "R' F2 R U2 R U' R' F",
          "R' U' F' U F R F' R U R' U' R' F R",          
        ]
      },
    ],
    T: [
      {
        caseId: 1,
        url: getUrlForCase('T', 1),
        algs: [
          "R' U' R U F R F'",
          "F U2 F' U' F U' R' F' R U R U' R'",
          "F R U R' U' R' F' R U R U' R'",          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('T', 2),
        algs: [
          "F R U' R' U R U R' F'",
          "R' F' R U R U' R' F",
          "F U R U' R' F2 R U R' U' R' F R",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('T', 3),
        algs: [
          "R U2 R2 F R F' R U' R' U R U2 R'",
          "R U F R' F' R U2 R U2 R2",
          "R' U' R' U R' F R F' R U' R2",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('T', 4),
        algs: [
          "R' U2 F2 R U R' F U' R",
          "R U R' U R U2 R2 F' R U' R' F2 R",
          "F R' F R2 U' R' U' R U R' F2",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('T', 5),
        algs: [
          "R U R' U' R U' R' F' U' F R U R'",
          "R U R' U2 R U R' U R' F R F'",
          "R2 F' R U' R' F2 R F R' F' R2",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('T', 6),
        algs: [
          "R' F R U2 R2 F R U' R",
          "R U' R U2 R' F R U2 R2 F",
          "F R F' U R2 U' R U R2"           
        ]
      },
    ],
    U: [
      {
        caseId: 1,
        url: getUrlForCase('U', 1),
        algs: [
          "R' U' F R' F' R U R",
          "F R U' R' U2 R U R' F'",
          "R' U' R' F R F' U R",          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('U', 2),
        algs: [
          "R2 F2 R U R' F U' R U R2",
          "R' F U' R U' R' U2 F2 R",
          "R2 F2 R U R U2 R2 F' R U' R",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('U', 3),
        algs: [
          "R U2 R U' R' F R' F2 U' F",
          "R' U' F2 U' R U R' U F2 R",
          "F' R U R' F U2 R U' R' F'",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('U', 4),
        algs: [
          "R2 F R F' R' F2 R U R' F R2",
          "R U' R' F' U F R U R' U R U' R'",
          "R' F U' R F R' U R F'",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('U', 5),
        algs: [
          "R U2 R' U R' F2 R F' R' F2 R",
          "R2 U R2 F' R U R U' R' F R U' R2",
          "R' F R U' F U2 R U' R' U F'",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('U', 6),
        algs: [
          "R F' U' R' U' R2 U R' U' R' F R",
          "R' F R2 U' R' F R' F' R U R' F' R",
          "R' U2 R U R2 F' R U R U' R' F R"          
        ]
      },
    ],
  },
  EG1: {
    A: [
      {
        caseId: 1,
        url: getUrlForCase('A', 1),
        algs: [
          "R' F' R U' F' R' F R2 U R'",
          "R' F R2 U R' F' U' R U' R'",
          "R' F' R U' F' R' F R2 U R'",
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('A', 2),
        algs: [
          "R U' F2 R U2 R U' F",
          "F R U' R' U R' F' R U F' R U R'",
          "R U' R' F' U' F2 R U' R'",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('A', 3),
        algs: [
          "R U' R' U2 R' F R2 U2 R' F",
          "F' R U R' U' R U R2 F' R",
          "R U' R' U2 R' F R2 U2 R' F",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('A', 4),
        algs: [
          "R' F R F' U R U' R2 F' R F",
          "R U R' U2 R' F' R F R' F R",
          "R U' R' F' U' R U R' U' F",           
        ]
      },{
        caseId: 5,
        url: getUrlForCase('A', 5),
        algs: [
          "R' F R U' R' F R U R U R' F'",
          "R' F2 R U' R U R' F' R U' R'",
          "F' R' F R U R U R' U' R U R'",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('A', 6),
        algs: [
          "R U R2 F' R2 U2 R' U' R' F R F'",
          "R U' R2 F R U' R' F R F'",
          "R U R2 F' R2 U2 R' U' R' F R F'",          
        ]
      },
    ],
    F: [
      {
        caseId: 1,
        url: getUrlForCase('F', 1),
        algs: [
          "R2 U' R2 U2 F2 U' R2", 
          "R2 U F2 U2 R2 U R2", 
          "R2 U' R2 U2 F2 U' R2",  
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('F', 2),
        algs: [
          "R U' R' U' R' F2 U' R U R", 
          "R' F U' R2 U F' R", 
          "R' U' R' U F2 R U R U R'",  
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('F', 3),
        algs: [
          "F U' F U F R' F2 U F U F' U' F R F2", 
          "F2 R' F' U F U' F' U' F2 R F' U' F' U F'", 
          "R' F' U' F' U F R F' U2 F U2 F' U' F2",          
        ]
      },
    ],
    H: [
      {
        caseId: 1,
        url: getUrlForCase('H', 1),
        algs: [
          "R U' R2 F R F' R' F' R F",
          "F' R' F R F R' F' R2 U R'",
          "F' R2 F' R F R' U R'",          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('H', 2),
        algs: [
          "F2 U' F U' F' U F' U' F U' F2",
          "F R U' R2 F U' F2 U R",
          "R U' R' U' R U' R2 F2 R U R U R'",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('H', 3),
        algs: [
          "R' U' R' F2 U F' R F'",
          "F U2 R U' R' F2 R' F2 R F'",
          "R U' R' F U2 F' R' F2 R F'",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('H', 4),
        algs: [
          "F' U R' F R F' U F2",
          "R' F R F' R' F R U' R' F R F'",
          "F' U2 F' U R' F' R F'"          
        ]
      },
    ],
    L: [
      {
        caseId: 1,
        url: getUrlForCase('L', 1),
        algs: [
          "R U' R' U R U' R2 F' R F",
          "R U R' F' R U2 R' U2 R U R'",
          "F R U' R' F' R U R' F' R U R'",          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('L', 2),
        algs: [
          "R' F R U' R' F R2 U R' F'",
          "R' F R F' R' F R U R U2 R'",
          "R' F' R F' R' F' R F' R' F2 R",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('L', 3),
        algs: [
          "R' U R2 U' R2 U' F R2 U' R'",
          "R U R2 F' R2 U' R2 U' R2 U' R2 U2 R",
          "R' U' R U' R' U2 F R2 U' R' U' R' F2 R",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('L', 4),
        algs: [
          "R U2 R' F R U' R2 F' R",
          "R' F R2 U R' F' R U2 R'",
          "R U2 R' F R U' R2 F' R",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('L', 5),
        algs: [
          "R U R' F' R U R' U' F R' F' R",
          "F' R' F R U' R U R' U' R U R'",
          "R' F R F U2 F U' F2",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('L', 6),
        algs: [
          "F R U' R' U R' F' R U R' F' R",
          "R' U2 F R U2 R U' R2 F",
          "R' F' R F U' R' F' R U R' F' R"          
        ]
      },
    ],
    P: [
      {
        caseId: 1,
        url: getUrlForCase('P', 1),
        algs: [
          "F U' R' F R U' F2 R U R'",
          "F2 R U R' U2 R U R' U' F",
          "F U' R' F R U' F2 R U R'",          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('P', 2),
        algs: [
          "R' F R2 U' R2 F R",
          "F U F' U' F U2 F U' F2",
          "R U' R2 F R2 U' R'",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('P', 3),
        algs: [
          "F' R U2 R' F' U2 F R' F' R",
          "F R' F U' F2 R U R",
          "F' R U2 R' F' U2 F R' F' R",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('P', 4),
        algs: [
          "F' R U R' U' R U R' F' R U R'",
          "R U' R' U R U' R' F R U' R'",
          "F' R U R' U' R U R' F' R U R'",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('P', 5),
        algs: [
          "R U' R2 F R U R U' R' U' R' F R F'",
          "F U' R U2 R' F' R U R' F'",
          "R' U' R' F2 U' R U2 F2 R",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('P', 6),
        algs: [
          "R' F R F' R' F R2 U R' U' R U' R'",
          "F R U' R' F R U2 R' U F'",
          "F R' F' R U R U R' U' R' F' R2 U R'"          
        ]
      },
    ],
    S: [
      {
        caseId: 1,
        url: getUrlForCase('S', 1),
        algs: [
          "R U' R2 F' R F U R' F R",
          "R U R' U F R U' R2 F' R",
          "R U' R2 F' R F U R' F R",          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('S', 2),
        algs: [
          "R' F R F U F2 R' F R",
          "F R' F' R F R U' R' U R' F' R",
          "R U R' F2 U F R U R'",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('S', 3),
        algs: [
          "R' F R U2 R U' R2 F2 R F'",
          "F R' F' R U R' F' R2 U R'",
          "R' F R U2 R U' R2 F2 R F'",           
        ]
      },{
        caseId: 4,
        url: getUrlForCase('S', 4),
        algs: [
          "F' U R U' R' U F R U R'",
          "F' R' F R2 U R' U' F R' F' R",
          "F' U R U' R' U F R U R'",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('S', 5),
        algs: [
          "R2 F U' R U' R U' F2",
          "R U' R' U R U' R' U F R U' R'",
          "R2 F U' R U' R U' F2",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('S', 6),
        algs: [
          "R' F R2 U' R2 F U R F' U F R'",
          "R' F R2 U' R' U R U' R' F",
          "R' F R2 U' R2 F U R F' U F R'"          
        ]
      },
    ],
    T: [
      {
        caseId: 1,
        url: getUrlForCase('T', 1),
        algs: [
          "R2 U R U' R2 F R U2 R' F",
          "R U2 R' U' R' F' R F R' F' R",
          "R2 U R U' R2 F R U2 R' F",          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('T', 2),
        algs: [
          "R U2 R' F R U' R' F' R U R'",
          "R U' R' F R U' R' F R U R' F'",
          "F' R' F R2 U R' U' R U R'",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('T', 3),
        algs: [
          "R U2 R' U' R' F' R2 U R'",
          "R' F R2 U' R' U' R' F2 R",
          "R U' R2 F R U R U2 R'",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('T', 4),
        algs: [
          "R' F R F' U R U' R' U F R U' R'",
          "R' U F R2 U' R2 U' F U' R",
          "R' F R F' U R U' R' U F R U' R'",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('T', 5),
        algs: [
          "R' F' R2 U R' F' R U R'",
          "R U R2 F' R F R' F' R",
          "R' F' R2 U R' F' R U R'",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('T', 6),
        algs: [
          "R' U' R U F2 U' F2 R U R",
          "R U R' F R U R' F U' R U' R'",
          "R U' R' U2 F R U2 R' F"          
        ]
      },
    ],
    U: [
      {
        caseId: 1,
        url: getUrlForCase('U', 1),
        algs: [
          "R U R' U R U R2 F R2 U' R'",
          "F2 U' F' U' F U' F' U F'",
          "F U2 F U2 F U F2",          
        ]
      },
      {
        caseId: 2,
        url: getUrlForCase('U', 2),
        algs: [
          "R U R' F' U' R U R' U' F R' F' R",
          "F' R2 F' R2 F' U' F2 R2",
          "F R U' R' F U' F' R' F' R",          
        ]
      },
      {
        caseId: 3,
        url: getUrlForCase('U', 3),
        algs: [
          "F' U2 R U2 R' U2 F",
          "R U R' U F' R U R' U' R U R2 F2 R",
          "F' U' F R' F2 R F' U F",          
        ]
      },{
        caseId: 4,
        url: getUrlForCase('U', 4),
        algs: [
          "R U' R' F R U' R2 F R",
          "R' F R F' R' F R2 U' R'",
          "R U' R' F R U' R2 F R",          
        ]
      },{
        caseId: 5,
        url: getUrlForCase('U', 5),
        algs: [
          "R' F R F' U R U' R' F R U' R'",
          "F U' R' F2 R F' U2 F'",
          "F2 R U2 R' U' F2 U2 F'",          
        ]
      },{
        caseId: 6,
        url: getUrlForCase('U', 6),
        algs: [
          "R' F R U' R' F R U' R U R' F'",
          "R' F R2 U' R' U F U F'",
          "F' U R U2 R' F U2 F"          
        ]
      },
    ],
  },
};
  
  export const transformScramble = (scramble, minMoves, maxMoves) => {
    const invertScramble = (scramble) => {
      if (!scramble) return '';
      let moves = scramble.split(' ');
      let inversedMoves = moves.map(move => {
        if (move.includes("'")) {
          return move.replace("'", "");
        } else if (move.includes("2")) {
          return move;
        } else {
          return move + "'";
        }
      });
      return inversedMoves.reverse().join(' ');
    };
  
    const addRandomU = (moveSet) => {
      const options = ["", "U", "U'", "U2"];
      const start = options[Math.floor(Math.random() * options.length)];
      const end = options[Math.floor(Math.random() * options.length)];
      return `${start} ${moveSet} ${end}`.trim();
    };
  
    const inversed = invertScramble(scramble);
    const transformedScramble = addRandomU(inversed);
    const faceMoves = generateFaceMoves(minMoves, maxMoves).join(' ');
    const finalScramble = `${transformedScramble} [${faceMoves}]`.trim(); 
    return finalScramble;
  };

const generateFaceMoves = (minMoves, maxMoves) => {
  if (minMoves > maxMoves) return []; // Basic validation

  const moves = ['R', 'U', 'F'];
  const suffixes = ['', '\'', '2'];

  let lastMove = '';
  const sequence = [];
  const moveCount = Math.floor(Math.random() * (maxMoves - minMoves + 1)) + minMoves;

  for (let i = 0; i < moveCount; i++) {
    let move = moves[Math.floor(Math.random() * moves.length)];
    while (
      (i === 0 && move === 'U') ||
      move === lastMove 
    ) {
      move = moves[Math.floor(Math.random() * moves.length)];
    }

    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    sequence.push(move + suffix);
    lastMove = move;
  }

  return sequence;
};
