import time

def main():
    print('Code Starting from Machine1')
    print("Starting loop...")
    count = 1
    while True:
        print(f"Count: {count}")
        count += 1
        time.sleep(1)

if __name__ == "__main__":
    main()
