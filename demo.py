import os
import subprocess
import sys
import time

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(root_dir, "HT6-Project")
    backend_dir = os.path.join(root_dir, "backend")

    venv_python = os.path.join(root_dir, ".venv", "Scripts", "python.exe")
    python_exec = venv_python if os.path.exists(venv_python) else sys.executable

    print("Starting backend server...")
    backend_process = subprocess.Popen(
        [python_exec, "-m", "uvicorn", "app.main:app", "--reload", "--port", "8000"],
        cwd=backend_dir
    )

    print("Starting frontend server...")
    frontend_process = subprocess.Popen(
        "npm run dev",
        cwd=frontend_dir,
        shell=True
    )

    try:
        print("Both servers running. Press Ctrl+C to stop.")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down servers...")
        backend_process.terminate()
        frontend_process.terminate()
        backend_process.wait()
        frontend_process.wait()
        print("Servers stopped.")

if __name__ == "__main__":
    main()
