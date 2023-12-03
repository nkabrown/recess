# 2023 Advent of Code Learnings

## Day 01

```node
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// recreate Node globals for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

`Array.from` gives you a nice bit of control when creating a new array from an indexed collection. You can pass a mapping function as the second optional parameter.

**How can you match overlapping words with Regex?**

To search for matches to any digit in numeric or numeral form I initially wrote this regex: `/\d|one|two|three|four|five|six|seven|eight|nine/g`. The test data summed up correctly but when run on the entire input my sum was not correct and I eventually noticed the numerals could overlap and the numeral following the overlap was not being reflected in the list of digits for each line.

For this test case "zoneight234", how can I create a Regex pattern that matches both "one" and "eight" since Regex matches consume matched characters, advancing the last index to the end of the match, before resuming the search.

My solution included swapping out `line.match()` with `line.matchAll()` and using a zero-width lookahead assertion with a named capturing group to avoid accessing an arbitrary array index.

**String.prototype.matchAll()**

(What is the difference between `String.prototype.match()` and `String.prototype.matchAll()`?)

**Zero-width Lookahead Assertion**

(What exactly is a zero-width lookahead assertion and why did it work here?)

`'zoneight234'.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)` created output that matched all digits including overlapping numerals:

```node
[
  [ '', 'one', index: 1, input: 'zoneight234', groups: undefined ],
  [ '', 'eight', index: 3, input: 'zoneight234', groups: undefined ],
  [ '', '2', index: 8, input: 'zoneight234', groups: undefined ],
  [ '', '3', index: 9, input: 'zoneight234', groups: undefined ],
  [ '', '4', index: 10, input: 'zoneight234', groups: undefined ]
]
```

But even though the array structure is regular and the value I'm seeking is always at the second index (for now) getting these digit values via array indices feels fragile and hard to change.

**Named Capturing Group**

The array returned by `Regex.prototype.exec` has a number of properties set on it, including `groups` which as you can notice is `undefined` above even though we are using a capturing group `(\d|one|two|three|four|five|six|seven|eight|nine)`. In order to add the matched values from our capturing group to the `groups` property we need to use a named capturing group `(?<digit>\d|one|two|three|four|five|six|seven|eight|nine)`. Now we can access the matches we care about using a property accessor that's resilient to changes `arr.groups?.digit`.

```node
[
  [ '', 'one', index: 1, input: 'zoneight234', groups: [Object: null prototype] { digit: 'one' } ],
  [ '', 'eight', index: 3, input: 'zoneight234', groups: [Object: null prototype] { digit: 'eight' } ],
  [ '', '2', index: 8, input: 'zoneight234', groups: [Object: null prototype] { digit: '2' } ],
  [ '', '3', index: 9, input: 'zoneight234', groups: [Object: null prototype] { digit: '3' } ],
  [ '', '4', index: 10, input: 'zoneight234', groups: [Object: null prototype] { digit: '4' } ]
]
```

**Notes**

`String.prototype.match(regex)` calls `RegExp.prototype[@@match](string)`.

`String.prototype.matchAll(regex)` calls `RegExp.prototype[@@matchAll](string)`.

https://tc39.es/ecma262/#sec-string.prototype.match

https://tc39.es/ecma262/#sec-regexp.prototype-@@match

<br/>

https://tc39.es/ecma262/#sec-string.prototype.matchall

https://tc39.es/ecma262/#sec-regexp-prototype-matchall

<br/>

>"The `|` regular expression operator separates two alternatives. The pattern first tries to match the left Alternative (followed by the sequel of the regular expression); if it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression). If the left Alternative, the right Disjunction, and the sequel all have choice points, all choices in the sequel are tried before moving on to the next choice in the left Alternative. If choices in the left Alternative are exhausted, the right Disjunction is tried instead of the left Alternative. Any capturing parentheses inside a portion of the pattern skipped by `|` produce undefined values instead of Strings."


>The form (?= Disjunction ) specifies a zero-width positive lookahead. In order for it to succeed, the pattern inside Disjunction must match at the current position, but the current position is not advanced before matching the sequel. If Disjunction can match at the current position in several ways, only the first one is tried. Unlike other regular expression operators, there is no backtracking into a (?= form (this unusual behaviour is inherited from Perl). This only matters when the Disjunction contains capturing parentheses and the sequel of the pattern contains backreferences to those captures.
>
>For example,
>
>/(?=(a+))/.exec("baaabac")
>matches the empty String immediately after the first b and therefore returns the array:
>
>["", "aaa"]
