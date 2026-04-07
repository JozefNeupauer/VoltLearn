#!/usr/bin/env python3
"""
Fix corrupted explanation blocks in lessons.ts.
The corruption: diagramType line is followed immediately by raw text (no explanation: ` wrapper).
Fix: insert `    explanation: \`` after diagramType line when the next line is raw text (not a property).
"""

import re

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

result = []
i = 0
fixes = 0

while i < len(lines):
    line = lines[i]
    
    # Check if this is a diagramType line
    if re.match(r"^\s+diagramType:\s+'[^']+',\s*$", line):
        result.append(line)
        i += 1
        # Check the next line - if it's raw text (not a TypeScript property), insert explanation: `
        if i < len(lines):
            next_line = lines[i]
            # A TypeScript property starts with spaces then identifier: or is a closing }
            # Raw text starts without leading spaces or is markdown/content
            is_ts_property = re.match(r"^\s+\w+:", next_line) or re.match(r"^\s*[}\])]", next_line) or re.match(r"^\s*$", next_line)
            if not is_ts_property:
                # This is raw text - insert explanation: ` before it
                result.append("    explanation: `")
                result.append("\n")
                fixes += 1
                print(f"  Fixed at line {i+1}: {next_line[:60].strip()}")
        continue
    
    result.append(line)
    i += 1

print(f"\nTotal fixes applied: {fixes}")

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.writelines(result)

print("File saved.")
