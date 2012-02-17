all: test-1 test-2 test-3

test-1 test-2 test-3:
	catchall -i ./examples/$@/script.js -o ./examples/$@/script.guarded.js -n 2
	catchall -i ./examples/$@/script.js -o ./examples/$@/script.guarded.min.js -u

	