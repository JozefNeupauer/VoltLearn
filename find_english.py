#!/usr/bin/env python3
import re

with open('src/data/lessons.ts') as f:
    lines = f.readlines()

for i, line in enumerate(lines, 1):
    stripped = line.strip()
    if stripped.startswith('explanation:') and '`' not in stripped:
        has_slovak = any(c in stripped for c in 'áéíóúýčšžľäôúäňťÁÉÍÓÚÝČŠŽĽÄÔÚÄŇŤ')
        if not has_slovak:
            print(f'L{i}: {repr(stripped)}')
