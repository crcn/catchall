all: test-1 test-2 test-3

test-1 test-2 test-3:
	catchall -i ./examples/$@/script.js -o ./examples/$@/script.guarded.js

	