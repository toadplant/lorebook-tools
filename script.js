$(document).ready(function () {
    // Define rating options
    const rating_options = {
        "None":
            "<strong>G/PG-rated</strong><br><strong class='text-danger'>Has no</strong> mature topics. Has <strong class='text-danger'>no sexual</strong> content of any kind.",
        "Mature":
            "<strong>R-rated</strong><br><strong class='text-success'>May have</strong> mature topics such as graphic violence, substance abuse, dead dove, etc. <strong class='text-danger'>Has no</strong> sexual content.",
        "Explicit":
            "<strong>18+ / NC17 / XXX-rated</strong><br><strong class='text-success'>May have</strong> mature topics. <strong class='text-success'>May have</strong> sexual content."
    };

    const visibility_options = {
        "Draft": "<strong>Only you</strong> can use and download your lorebook.",
        "Private": "<strong>Only you</strong> can use and download your lorebook.",
        "Friends only": "<strong>Only users from your friend list</strong> can use and download your lorebook.",
        "Public": "<strong>All users</strong> can use and download your lorebook."
    };

    // Lorebook values
    const tokenBudget = ($('#tokenBudgetInput').val());
    const scanDepth = $('#scanDepthInput').val();

    // Entry values
    const entryName = ($('#entryName').val());
    const priority = ($('#priorityInput').val());
    const position = ($('#positionSelect').val());

    // Keyword values 
    const primaryKeys = ($('#primaryKeys').val());
    const secondaryKeys = ($('#secondaryKeys').val());
    const caseSensitive = ($('#caseSensitiveSwitch').val());
    const selective = ($('#selectiveSwitch').val());

    /**
     * Sets up dynamic content that updates when any of the specified inputs change
     * @param {string[]|string} inputIds - Single input ID or array of input IDs to monitor
     * @param {string} targetId - ID of the div to update
     * @param {function} templateFn - Function that receives an object of input values and returns HTML
     */
    function setupDynamicDiv(inputIds, targetId, templateFn) {
        // Convert single ID to array for uniform handling
        const inputArray = Array.isArray(inputIds) ? inputIds : [inputIds];

        const $inputs = inputArray.map(id => $('#' + id));
        const $target = $('#' + targetId);

        // Get current values from all inputs
        function getInputValues() {
            const values = {};
            $inputs.forEach(($input, index) => {
                values[inputArray[index]] = $input.val();
            });
            return values;
        }

        // Update the target content
        function update() {
            $target.html(templateFn(getInputValues()));
        }

        // Initial update
        update();

        // Set up change handlers for all inputs
        $inputs.forEach($input => {
            const eventType = $input.is('input[type="text"], input[type="number"], textarea') ? 'input' : 'change';
            $input.on(eventType, update);
        });
    }

    function getArray(value) {
        return value.split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
    }

    function randomCaseWord(word) {
        let result = '';
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            // Generate a random number between 0 and 1
            if (Math.random() < 0.5) {
                // If random number is less than 0.5, convert to lowercase
                result += char.toLowerCase();
            } else {
                // Otherwise, convert to uppercase
                result += char.toUpperCase();
            }
        }
        return result;
    }


    // Rating alert
    $('#ratingSelect').change(function () {
        const sel = $(this).find('option:selected').text();
        const $alert = $('#ratingAlert').toggleClass('alert-hidden', !rating_options[sel]);
        if (rating_options[sel]) $alert.addClass('alert alert-warning').html(rating_options[sel]);
    });

    // Visibility alert
    $('#visibilitySelect').change(function () {
        const sel = $(this).find('option:selected').text();
        const $alert = $('#visibilityAlert').toggleClass('alert-hidden', !visibility_options[sel]);
        if (visibility_options[sel]) $alert.addClass('alert alert-warning').html(visibility_options[sel]);
    });

    // Dynamic divs
    setupDynamicDiv('scanDepth', 'scanDepth-target', (v) =>
        `Lorebooks will search for keys <strong>in the last ${v.scanDepth} messages</strong> of the chat.`
    );

    setupDynamicDiv('tokenBudget', 'tokenBudget-target', (v) => {
        const chars = v.tokenBudget * 3;
        const pct = Math.ceil((v.tokenBudget / 8192) * 100);
        return `You reserve <strong>${v.tokenBudget}</strong> tokens for content of entries. It's ~<strong>${chars}</strong> characters and <strong>${pct}% of 8K</strong> context memory.`;
    });

    setupDynamicDiv(['entryName', 'priority', 'tokenBudget'], 'priority-target', (v) => {
        return `If two entries are triggered but exceed ${v.tokenBudget} tokens, <strong>${v.entryName}</strong> will be chosen only if other entry's priority is lower than <strong>${v.priority}</strong>.`;
    });

    setupDynamicDiv(['recursiveScanning', 'scanDepth'], 'recursiveScanning-target', (v) => {
        if ($('#recursiveScanning').is(':checked')) {
            return `<strong>Looping scan:</strong> Lorebook will scan the <strong>last ${v.scanDepth} messages</strong> and re-scan until triggers stop or token budget is hit.`;
        } else {
            return `<strong>Chat-only scan:</strong> Lorebook will only scan the <strong>last ${v.scanDepth} messages</strong> of chat for keywords.`;
        }
    });

    setupDynamicDiv('enabledSwitch', 'enabledSwitch-target', (v) => {
        if ($('#enabledSwitch').is(':checked')) {
            return `The entry is activated.`;
        } else {
            return `The entry is deactivated. Use this when you're still working on it or want users to download your lorebook and choose which entries to use.`;
        }
    });

    setupDynamicDiv('constantSwitch', 'constantSwitch-target', () => {
        if ($('#constantSwitch').is(':checked')) {
            return `Constant entries are always there. The entry will stay in the prompt whenever key is mentioned or not.`;
        } else {
            return `Non-constant entries are trigger-only. The entry will go in memory only when keyword is used.`;
        }
    });

    setupDynamicDiv(['positionSelect', 'chatDepth'], 'positionSelect-target', (v) => {
        if (v.positionSelect === 'before_char') {
            return `Before char: Entry will go before description of the bot and have low impact on the next response.`;
        } else if (v.positionSelect === 'after_char') {
            return `After char: Entry will go after description of the bot near to speech examples.`;
        } else if (v.positionSelect === 'in_chat') {
            if (v.chatDepth === "1") {
                return `In-depth: Entry will go into chat log right before AI's next responce as the most impactful instruction.`;
            } else {
                return `In-depth: Entry will go into chat log between ${v.chatDepth - 1} and ${+v.chatDepth + 1} messages, hidden for user but visible for AI. Has the biggest impact.`;
            }
        } else {
            return '';
        }
    });


    setupDynamicDiv(['caseSensitive', 'primaryKeys', 'secondaryKeys'], 'caseSensitive-target', (v) => {
        if ($('#caseSensitive').is(':checked')) {
            return `The letter case of keywords will matter. The entry will work only if <strong>${getArray(v.primaryKeys)[0]}</strong> is in the message, not <strong>${getArray(v.primaryKeys)[0].toUpperCase()}</strong>.`;
        } else {
            return `The letter case of keywords won't matter. The entry will be triggered both by <strong>${getArray(v.primaryKeys)[0]}</strong>, <strong>${randomCaseWord(getArray(v.primaryKeys)[0])}</strong>, or other variation.`;
        }
    });

    setupDynamicDiv('selective', 'selective-target', (v) => {
        if ($('#selective').is(':checked')) {
            return `The entry will be triggered when at least one of primary AND secondary keys is mentioned in the same message.`;
        } else {
            return `Any word from primary and secondary keys will trigger the entry.`;
        }
    });

    // Show/hide chat depth based on position selection
    $('#positionSelect').change(function () {
        $('#chatDepthContainer').attr('hidden', $(this).find('option:selected').text() !== 'In Chat');
    })

});
