import torch
import time

# # Test 1: Just importing torch should trigger the sound!
# print("\nTest 1: You should have heard a rev just from importing torch!")
# time.sleep(2)  # Wait to hear the sound

# def test_cuda_operations():
#     print("\nStarting CUDA operations test...")
    
#     # Method 2: Using .cuda()
#     print("\nTest 2: Using .cuda()")
#     tensor1 = torch.randn(1000, 1000)
#     tensor1 = tensor1.cuda()
#     time.sleep(1)  # Wait to hear the sound
    
#     # Method 3: Using .to('cuda')
#     print("\nTest 3: Using .to('cuda')")
#     tensor2 = torch.randn(1000, 1000)
#     tensor2 = tensor2.to('cuda')
#     time.sleep(1)
    
#     # Method 4: Using device='cuda'
#     print("\nTest 4: Using device='cuda'")
#     tensor3 = torch.randn(1000, 1000, device='cuda')
#     time.sleep(1)
    
#     # Method 5: Using .to(device='cuda')
#     print("\nTest 5: Using .to(device='cuda')")
#     tensor4 = torch.randn(1000, 1000)
#     tensor4 = tensor4.to(device='cuda')
#     time.sleep(1)

# if __name__ == '__main__':
#     print("Make sure you have the VSCode extension running!")
#     print("You should hear the engine rev for each CUDA operation")
#     print("Including when you just import torch!\n")
#     test_cuda_operations()
#     print("\nTest complete!") 