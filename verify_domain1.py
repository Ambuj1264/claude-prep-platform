import re
import json

def parse_md(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    questions = []
    # Split by "**Question"
    parts = re.split(r'\*\*Question\s+\d+\s*—', content)
    if len(parts) > 1:
        parts = parts[1:]
    else:
        # Maybe split by ### Question
        parts = re.split(r'### Question \d+', content)[1:]

    for p in parts:
        # Extract scenario
        scenario_match = re.search(r'\*\*Scenario:\*\*\s*(.*?)\n\n(.*?)(?=\n[A-D]\))', p, re.DOTALL)
        if not scenario_match:
            continue
        
        scenario = scenario_match.group(1).strip()
        question_text = scenario_match.group(2).strip()
        
        # Extract options
        options = {}
        for opt in ['A', 'B', 'C', 'D']:
            # Look for A) text up to B) or Correct Answer
            opt_match = re.search(rf'{opt}\)\s*(.*?)(?=\n[A-D]\)|\n\*\*Correct Answer)', p, re.DOTALL)
            if opt_match:
                options[opt] = opt_match.group(1).strip()
        
        # Extract correct answer
        ans_match = re.search(r'\*\*Correct Answer:\*\*\s*([A-D])\)?\s*(.*?)(?=\n\n\*\*Why)', p, re.DOTALL)
        if not ans_match:
            continue
        
        correct_letter = ans_match.group(1).strip()
        
        questions.append({
            'scenario': scenario,
            'question': question_text,
            'options': options,
            'correct_letter': correct_letter
        })
    return questions

def check_ts(md_questions, ts_filepath):
    with open(ts_filepath, 'r', encoding='utf-8') as f:
        ts_content = f.read()
        
    # Quick and dirty: count "id: " to ensure 40 questions
    ts_qs = len(re.findall(r'id:\s*1\d\d', ts_content))
    print(f"MD Questions found: {len(md_questions)}")
    print(f"TS Questions found: {ts_qs}")
    
    # Let's extract texts from TS
    # This might be hard to parse properly if it's TS code. Let's just do a string search for the exact text of options
    mismatches = 0
    for i, mq in enumerate(md_questions):
        q_idx = i + 1
        # Check if question text exists in TS
        q_text_clean = mq['question'].replace('\n', ' ').strip()
        # Escaping regex characters for search
        # Instead of strict regex, let's just check if a large chunk of the text is in the TS file
        chunk = q_text_clean[:50]
        if chunk not in ts_content.replace('\n', ' '):
            print(f"Question {q_idx} text not found in TS! Chunk: {chunk}")
            mismatches += 1
            
        # Check correct answer content
        ans_text = mq['options'][mq['correct_letter']].replace('\n', ' ').strip()
        chunk_ans = ans_text[:30]
        if chunk_ans not in ts_content.replace('\n', ' '):
            print(f"Question {q_idx} correct answer not found! Expected: {chunk_ans}")
            mismatches += 1
            
    print(f"Total potential mismatches: {mismatches}")
    if mismatches == 0 and len(md_questions) == 40 and ts_qs == 40:
        print("SUCCESS: Domain 1 completely matches the source Markdown.")
    elif mismatches > 0:
        print("ERROR: Mismatches found. Need to regenerate domain1.ts.")
    else:
        print("ERROR: Question counts don't match.")

md_path = "/Users/ambujsingh/Documents/code/test-data/claude-architect-foundations-questions/Domain1_Corrected_Question_Bank.md"
ts_path = "/Users/ambujsingh/Documents/code/test-data/claude-prep-platform/app/lib/data/domain1.ts"

qs = parse_md(md_path)
check_ts(qs, ts_path)

