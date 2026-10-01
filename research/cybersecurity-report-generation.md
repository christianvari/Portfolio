# A method for generating a cybersecurity report

> Granted patent IT202400016273A1 — filed 2024, granted 2026. Machine-learning pipeline that merges auditors’ vulnerability notes, rewrites them in report style and assigns a severity, automating security audit reports.

- Original title (it): Un metodo per eseguire la generazione di un report di sicurezza informatica
- Publication number: IT202400016273A1
- Status: Granted patent
- Filed: 2024
- Granted: 2026
- Office: Italian Patent and Trademark Office (UIBM)
- Field: Cybersecurity · Security source code audits
- Holder: Christian Vari (https://www.christianvari.dev/)
- Official record: https://worldwide.espacenet.com/patent/search?q=pn%3DIT202400016273A1
- Web page: https://www.christianvari.dev/research/cybersecurity-report-generation/
- Keywords: cybersecurity report generation, security audit automation, AI-assisted security auditing, vulnerability severity classification, smart contract audit reports, machine learning, NLP

## Summary

A method and system that automatically turn the findings of a security source code audit into the final report. Several researchers annotate the same code; the system merges their notes for each part of the code into one consistent description, rewrites it in professional report style and assigns a severity, then produces the client-ready document.

The work a quality-assurance team does by hand (aggregating notes, resolving disagreements about severity, rewriting and formatting) becomes a fast, reproducible pipeline.

## The problem

In a security audit, each researcher reviews the code independently and leaves notes on a pull request in the project's git repository. The same vulnerability is often described several times, in different words and with different severity ratings.

Before anything reaches the client, a quality-assurance team has to collect every note, reconcile discrepancies, settle on a severity (informational, minor, major or critical) and rewrite everything to the company's reporting standard. The process is slow, depends on scarce specialists and is hard to reproduce.

## How it works

1. **Embedder** (Vector encoding): Reads the downloaded pull request, with its notes, from the database and turns it into numerical vectors the models can process.
2. **Seq2Seq LSTM with attention** (Merge notes): Combines every note that refers to the same section of code into a single, coherent description. Trained on a general English corpus and on historical audit data.
3. **Transformer** (Write the finding): Rewrites each merged description in the technical, impersonal style of a security report: where the issue is, why it happens, its consequences and the recommendation. Fine-tuned on more than a thousand archived vulnerability descriptions.
4. **BERT classifier** (Assign severity): Classifies every finding as informational, minor, major or critical. Fine-tuned on descriptions with known severities and on public vulnerability databases (CVEs).
5. **Formatter** (Produce the report): Places the final descriptions and severities into the company's report template and exports a PDF the client can download.

## Architecture

- **Frontend**: Web app where a user requests a report by pointing at a git repository and pull request.
- **Orchestrator**: Coordinates the flow, saves each request and its progress to the database and notifies the other services through an event channel.
- **Parser**: The only component with repository access. Downloads the pull request with its notes and converts it to JSON.
- **Analyzer**: Runs the machine-learning pipeline and stores the final descriptions and severities.
- **Formatter**: Generates the PDF report from the template.

## Why it matters

- Reports in a fraction of the time, without a manual consolidation step
- Consistent, reproducible severity assessments
- Independent, scalable services: each can be replicated, restarted or stopped on its own
- Repository access isolated in a single component
