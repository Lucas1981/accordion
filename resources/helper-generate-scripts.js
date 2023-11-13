// const fs = require('fs')
// const root = ['Bbb', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'];
// const types = [
//     'minor',
//     'major',
//     'dominantSeventh',
//     'diminishedSeventh'
// ]
// const dataRaw = fs.readFileSync('chords.json', { encoding: 'utf-8' });
// const data = JSON.parse(dataRaw)
// const filtered = Object.fromEntries(
//     Object.entries(data)
//         .filter(([key]) => types.includes(key))
//         .map(([key, value]) => 
//             [key, Object.values(value).filter(value => root.includes(value[0]))]
//         )
// )

// const frequencyMap = {
//     'C': 261.63,
//     'Db': 277.18,
//     'D': 293.66,
//     'D#': 311.13,
//     'E': 329.63,
//     'F': 349.23,
//     'Gb': 369.99,
//     'G': 392.00,
//     'G#': 415.30,
//     'A': 440.00,
//     'A#': 466.16,
//     'B': 493.88,
//   };

// const keyIndex = [
//     ['C', 'B#', 'Dbb', 'A###'],
//     ['Db', 'C#', 'Ebbb', 'B##'],
//     ['D', 'C##', 'Ebb', 'B###', 'Fbbb'],
//     ['Eb', 'D#', 'Fbb', 'C###'],
//     ['E', 'D##', 'Fb', 'Gbbb'],
//     ['F', 'E#', 'Gbb', 'D###'],
//     ['Gb', 'F#', 'Abbb', 'E##'],
//     ['G', 'F##', 'Abb', 'E###'],
//     ['Ab', 'G#', 'Bbbb', 'F###'],
//     ['A', 'G##', 'Bbb', 'Cbbb'],
//     ['Bb', 'A#', 'Cbb', 'G###'],
//     ['B', 'A##', 'Cb', 'Dbbb']
//   ];

// const finalFrequencyMap = {
//     // A3
//     A: 220,
//     'G##': 220,
//     Bbb: 220,
//     Cbbb: 220,
//     Bb: 233.08,
//     'A#': 233.08,
//     Cbb: 233.08,
//     'G###': 233.08,
//     B: 246.94,
//     'A##': 246.94,
//     Cb: 246.94,
//     Dbbb: 246.94,
//     C: 261.63,
//     'B#': 261.63,
//     Dbb: 261.63,
//     'A###': 261.63,
//     Db: 277.18,
//     'C#': 277.18,
//     Ebbb: 277.18,
//     'B##': 277.18,
//     D: 293.66,
//     'C##': 293.66,
//     Ebb: 293.66,
//     'B###': 293.66,
//     Fbbb: 293.66,
//     Eb: 311.13,
//     'D#': 311.13,
//     Fbb: 311.13,
//     'C###': 311.13,
//     E: 329.63,
//     'D##': 329.63,
//     Fb: 329.63,
//     Gbbb: 329.63,
//     F: 349.23,
//     'E#': 349.23,
//     Gbb: 349.23,
//     'D###': 349.23,
//     Gb: 369.99,
//     'F#': 369.99,
//     Abbb: 369.99,
//     'E##': 369.99,
//     G: 392,
//     'F##': 392,
//     Abb: 392,
//     'E###': 392,
//     Ab: 415.3,
//     'G#': 415.3,
//     Bbbb: 415.3,
//     'F###': 415.3,
//   }

// const generateAliases = arr => {
//     return Object.entries(arr)
//         .reduce((acc, [key, val]) => {
//             const aliases = keyIndex.find(series => series.includes(key))
//             return {
//                 ...acc,
//                 ...aliases.reduce((acc2, curr2) => ({ ...acc2, [curr2]: val }), {})
//             }
//         }, {})
// }

// const cut = {
//     Bb: 466.16,
//     'A#': 466.16,
//     Cbb: 466.16,
//     'G###': 466.16,
//     B: 493.88,
//     'A##': 493.88,
//     Cb: 493.88,
//     Dbbb: 493.88
// }

// // console.log(filtered)
// // console.log(generateAliases(frequencyMap))
// // console.log(
// //     Object.fromEntries(Object.entries(cut).map(([key, value]) => [key, value / 2]))
// // )
// // console.log(
// //     Object.fromEntries(Object.entries(finalFrequencyMap).map(([key, value]) => [`${key}3`, value]))
// // )

// console.log({
//     ...Object.fromEntries(Object.entries(finalFrequencyMap).map(([key, value]) => [`${key}1`, value / 4])),
//     ...Object.fromEntries(Object.entries(finalFrequencyMap).map(([key, value]) => [`${key}2`, value / 2])),
//     ...Object.fromEntries(Object.entries(finalFrequencyMap).map(([key, value]) => [`${key}3`, value])),
//     ...Object.fromEntries(Object.entries(finalFrequencyMap).map(([key, value]) => [`${key}4`, value * 2])),
//     ...Object.fromEntries(Object.entries(finalFrequencyMap).map(([key, value]) => [`${key}5`, value * 4])),
//     ...Object.fromEntries(Object.entries(finalFrequencyMap).map(([key, value]) => [`${key}6`, value * 8])),
//     ...Object.fromEntries(Object.entries(finalFrequencyMap).map(([key, value]) => [`${key}7`, value * 16])),
//     ...Object.fromEntries(Object.entries(finalFrequencyMap).map(([key, value]) => [`${key}8`, value * 32])),
// })

const root = [
    'Bbb', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F',
    'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#'
];

const majorThirds = [
    'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E',
    'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'F##'
  ];

const octaveMapper = [
    2, 2, 2, 2, 2, 2, 2, 3, 2,
    3, 2, 3, 3, 3, 3, 3, 3, 3,
    3, 4
]

const staged = [
    [ 'Bbb', 'Dbb', 'Fbb', 'Abbb' ],
    [ 'Fb', 'Abb', 'Cbb', 'Ebbb' ],
    [ 'Cb', 'Ebb', 'Gbb', 'Bbbb' ],
    [ 'Gb', 'Bbb', 'Dbb', 'Fbb' ],
    [ 'Db', 'Fb', 'Abb', 'Cbb' ],
    [ 'Ab', 'Cb', 'Ebb', 'Gbb' ],
    [ 'Eb', 'Gb', 'Bbb', 'Dbb' ],
    [ 'Bb', 'Db', 'Fb', 'Abb' ],
    [ 'F', 'Ab', 'Cb', 'Ebb' ],
    [ 'C', 'Eb', 'Gb', 'Bbb' ],
    [ 'G', 'Bb', 'Db', 'Fb' ],
    [ 'D', 'F', 'Ab', 'Cb' ],
    [ 'A', 'C', 'Eb', 'Gb' ],
    [ 'E', 'G', 'Bb', 'Db' ],
    [ 'B', 'D', 'F', 'Ab' ],
    [ 'F#', 'A', 'C', 'Eb' ],
    [ 'C#', 'E', 'G', 'Bb' ],
    [ 'G#', 'B', 'D', 'F' ],
    [ 'D#', 'F#', 'A', 'C' ],
    [ 'A#', 'C#', 'E', 'G' ]
  ]

console.log(staged.map(
    record => record.map(note => `${note}4`)
))