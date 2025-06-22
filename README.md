# Lorebook Playground and Interactive guide



# 🧩 Basics

## Lorebooks

Lorebooks (aka world info) help your bot to act more in truth and remember more details about characters, setting, or story without using too many tokens of context memory. 

Lorebooks contain **entries**. When user or the bot mention a certain **keyword**, the matching entry is temporally added to the bot’s memory.

## Entries

An entry is a specific piece of prompt—details or instructions—tied to keywords. Only  bot can "see" triggered entries.

### Keys

Keys (or keywords) are words and phrases that, when mentioned in a chat, bring a related entry into bot memory. For example, mentioning "wyvern" pulls in related texts about wyverns, thier habitat and behavior. 

Keys have partial match type, meaning a key **"cat"** will defaultly react to words **cat**erpillar, **Cat**helyn, and certifi**cat**ed.


> [!NOTE]
> Other related information you might miss
> <details><summary>What are tokens?</summary>
>  Tokens are the smallest bits of text AI uses to process and understand language. If people use letters and words, AI uses tokens. 1 token might be a word or a fragment. On average, 1 token is 3.7 symbols, but this varies by model. LLaMA, Mistral, DeepSeek, and GPT each tokenize differently.
> See it yourself on 🔗 [Huggingface tokenizer playground](https://www.notion.so/%5B%3Chttps://huggingface.co/spaces/Xenova/the-tokenizer-playground%3E%5D(%3Chttps://huggingface.co/spaces/Xenova/the-tokenizer-playground%3E))
>  </details>
> <details><summary>What is prompt?</summary>
>  
>  </details>
> <details>
>  <summary>How does memory of chat works?</summary>
>  
>  </details>



# ✍ What can you put in entries?

Facts: Story details, world-building, or background info; specific details about characters, places, or objects.

More examples: character's opinion on rare topics or scene examples.

Instructions: Guidelines for how the bot should respond when the entry is triggered.

Chat Events Tracking: Replace summary with lorebook. Make motes on save key moments of your chat to maintain consistency.

# 📖 Lorebook settings

### Name  
Lorebook title. Used in search.

### Description 
Info about lorebook or brief manual for users goes here.

### Scan Depth
Number of last chat messages the lorebook checks for keywords.

### Token Budget
Number of tokens you reserve for content of entries.

### Recursive scanning

The function that searches keywords in messages and entries, reapeating the scanning untill Token Budget is hit or no more ralevant entries left.  

> **When off**  
**Chat Only Scan:** lorebook searches for keywords only in messages withing Scan Depth. 

> **When on**  
**Looping scan**: lorebook searches for keywords in messages withing Scan Depth, then scans triggered entries and keeps re-scaning appearing entries until triggering stops or token budget is hit.

# 💬 Entries settings

### Name

Entry title. Only for easier navigation. Doesn't affect prompt.

### Keys

Comma-separated list of primary keywords to activate the entry. 

### Secondary keys 

Comma-separated list of extra keywords for entry fine-tuning. Necessary mostly for the use of Selective entries. 

### Content

Container for inforrmation or instruction that will go into the prompt to the set position.

### Position

- **Before char**: entry goes **before description** of the bot.
- **After char**: entry goes **under the description** of the bot.
- **In-depth**: entry goes **inside the chat** log.

### Chat Depth

Number of pisition within chatlog. If In-Depth position is chosen, the Chat Depth defines how deep entry will go into the chat. For example Chat Depth of 3 puts the entry between 2nd and 4th messages. 

### Priority

Number of entry's "importance level". If many entries are triggered at once and they can't fit in the Token Budget, the lorebook picks entries based on how high their priority is.


### Constant

Property of entry definig the way the entry gets into the prompt.

> **When Off:**   
Trigger-only: non-constant entry goes in memory only when keyword is used.

> **When On:**  
Always there: constant entry stays in the prompt whenever key is mentioned or not. 

### Selective 

Property of entry definig the logic of kewords use. 

> **When Off:**  
> The entry will be triggered by any word from primary OR secondary keys.

> **When On:**  
> The entry will be triggered only if at least one of primary AND secondary keys is used. 

### Enabled

Property that turns on and off the entry.

> **When Off:**  
> The entry is activated.

> **When On:**  
> The entry is deactivated. Use this when you're still working on it or want users to download your lorebook and choose which entries to use. 

### Case Sensitive

Property of entry definig the strictness of case match for keywords. 

> **When Off:**  
> The letter case of keywords won't matter.

> **When On:**  
> The letter case of keywords will matter.