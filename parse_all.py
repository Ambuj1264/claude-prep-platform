import re
import json

def parse_markdown(filepath, domain_id):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    parts = re.split(r'(?:\*\*|###)\s*Question\s+\d+.*?(?:\n\*\*Scenario:\*\*|\nScenario:|\n\*\*Scenario\*\*)', content)
    
    if len(parts) <= 1:
        print(f"Failed to split questions in {filepath}")
        return []

    questions = []
    for idx, block in enumerate(parts[1:]):
        q_id = domain_id * 100 + (idx + 1)
        
        block = block.strip()
        lines = block.split('\n')
        scenario = lines[0].strip()
        if scenario.startswith("**"):
            scenario = scenario.strip("*")
            
        question_lines = []
        i = 1
        while i < len(lines):
            line = lines[i]
            if re.match(r'^[A-D]\)', line.strip()):
                break
            if line.strip() != '':
                question_lines.append(line.strip())
            i += 1
        question_text = " ".join(question_lines)

        options = []
        opt_texts = {'A': '', 'B': '', 'C': '', 'D': ''}
        current_opt = None
        while i < len(lines):
            line = lines[i]
            match = re.match(r'^([A-D])\)\s*(.*)', line.strip())
            if match:
                current_opt = match.group(1)
                opt_texts[current_opt] += match.group(2) + " "
            elif current_opt and not line.startswith('**Correct Answer:'):
                if line.strip() != '':
                    opt_texts[current_opt] += line.strip() + " "
            
            if line.startswith('**Correct Answer:'):
                break
            i += 1
            
        for k, v in opt_texts.items():
            options.append({
                "letter": k,
                "text": v.strip()
            })

        correct_letter = ""
        explanation_lines = []
        while i < len(lines):
            line = lines[i]
            ans_match = re.match(r'^\*\*Correct Answer:\*\*\s*([A-D])', line.strip())
            if ans_match:
                correct_letter = ans_match.group(1)
                rest = line[ans_match.end():].strip()
                rest = re.sub(r'^\)?[:\-\s]+', '', rest)
                if rest:
                    explanation_lines.append(rest)
            elif line.startswith('**Why') or line.startswith('**Pattern:'):
                break
            else:
                if line.strip() != '':
                    explanation_lines.append(line.strip())
            i += 1
            
        explanation = " ".join(explanation_lines).strip()

        why_wrong = []
        current_wrong = None
        while i < len(lines):
            line = lines[i]
            if line.startswith('**Pattern:'):
                break
            
            match_why = re.match(r'^\*\*Why ([A-D]) is [wW]rong:\*\*\s*(.*)', line.strip())
            if match_why:
                current_wrong = match_why.group(1)
                why_wrong.append({
                    "letter": current_wrong,
                    "reason": match_why.group(2).strip() + " "
                })
            elif current_wrong:
                if line.strip() != '':
                    why_wrong[-1]["reason"] += line.strip() + " "
            i += 1
            
        for w in why_wrong:
            w["reason"] = w["reason"].strip()

        pattern = ""
        while i < len(lines):
            line = lines[i]
            if line.startswith('**Pattern:'):
                pattern = line.replace('**Pattern:**', '').replace('**Pattern**', '').strip()
            i += 1
            
        questions.append({
            "id": q_id,
            "domain": domain_id,
            "scenario": scenario,
            "question": question_text,
            "options": options,
            "correctAnswer": correct_letter,
            "explanation": explanation,
            "whyWrong": why_wrong,
            "pattern": pattern
        })

    return questions

def generate_ts(questions, ts_filepath, domain_id):
    with open(ts_filepath, 'w', encoding='utf-8') as f:
        f.write("import { Question } from '../types';\n\n")
        f.write(f"export const domain{domain_id}Questions: Question[] = ")
        json.dump(questions, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    print(f"Domain {domain_id}: Generated {len(questions)} questions.")

base_md_path = "/Users/ambujsingh/Documents/code/test-data/claude-architect-foundations-questions/Domain{}_Corrected_Question_Bank.md"
base_ts_path = "/Users/ambujsingh/Documents/code/test-data/claude-prep-platform/app/lib/data/domain{}.ts"

for d in range(1, 6):
    md_file = base_md_path.format(d)
    ts_file = base_ts_path.format(d)
    qs = parse_markdown(md_file, d)
    generate_ts(qs, ts_file, d)

