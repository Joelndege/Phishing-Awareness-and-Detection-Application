# Methodology and evaluation notes

## Aim

Demonstrate how transparent text-based rules can surface common email warning signs and prompt a safer next step. The prototype supports awareness and classroom review; it is not an email gateway or a verdict engine.

## Input and processing

The user pastes message text into the checker. JavaScript applies a small set of regular-expression rules to the supplied text in the browser. Rules look for pressure language, requests for credentials or sign-in codes, URLs and common shorteners, rewards, payment requests, attachments, and (when both are pasted) a sender email domain that differs from a URL domain. Each matched rule produces a plain-language explanation. No input is sent to a server or retained by this site.

## How to interpret results

The number of matched patterns is a learning cue, not a calibrated probability or a prediction of maliciousness. Legitimate messages can contain an urgent deadline, a link, or an attachment. Real phishing messages may avoid every listed phrase. A difference between sender and link domains can also be normal for a service provider. Verify unexpected requests through a separate contact route you already trust.

## Limitations

- Text only: no MIME parsing, header authentication (SPF, DKIM, DMARC), visual analysis, attachment scanning, URL redirects, domain reputation, or threat intelligence.
- Simple rules: no training, accuracy claim, or claim of comprehensive detection.
- Domain comparison is deliberately rudimentary and may flag legitimate third-party links.
- The example dataset is fictional and designed for discussion; it is not a representative corpus and must not be used to claim detection performance.

## Suggested classroom review

1. Open the sample dataset and identify clues before reading its notes.
2. Paste each example into the checker and compare the displayed indicators with the annotations.
3. Add a harmless phrase that triggers a rule and discuss false positives.
4. Consider an indirect or carefully written suspicious message that triggers no rule and discuss false negatives.
5. Explain why a person should verify through a known channel instead of relying on this prototype's score.

## Sources for awareness guidance

- CISA, [Recognize and Report Phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing).
- US Federal Trade Commission, [How To Recognize and Avoid Phishing Scams](https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams).

The sources inform the general awareness advice. The checker rules are a small student implementation, not an endorsement or validation by either organisation.
