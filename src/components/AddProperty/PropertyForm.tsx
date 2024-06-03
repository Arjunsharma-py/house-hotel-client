import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import ImageUploader from "../smallComponents/ImageUploader";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Link as ReactRouterLink } from "react-router-dom";
import GradientButton from "../smallComponents/GradientButton";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import APIClient from "../../services/apiClient";
import axios from "axios";
import { FaHouse } from "react-icons/fa6";
import { MdApartment } from "react-icons/md";
import { HiMiniHomeModern } from "react-icons/hi2";

interface Images {
  title?: string;
  src: string;
}

interface RegisterationPayload {
  hostId: string;
  details: {
    name: string;
    description: string;
  };
  address: { full: string };
  property_type: string;
  price: {
    original_price: number;
  };
  email: string;
  images: Images[];
}

const schema = z.object({
  title: z.string().min(3, {
    message: "Enter your Property title with atleast 3 characters.",
  }),
  description: z
    .string()
    .min(3, { message: "Enter description with atleast 3 characters." }),
  address: z.string().min(3, {
    message: "Enter your Property title with atleast 3 characters.",
  }),
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const PropertyForm = ({ onBack, onNext }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [otherError, setOtherError] = useState({
    price: "",
    property_type: "",
    files: "",
  });
  const format = (val: string) => `₹` + val;
  const parse = (val: string) => val.replace(/^\$/, "");

  const [price, setPrice] = useState("500");
  const [propertyType, setPropertyType] = useState("house");

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const apiClient = new APIClient("/house/add-house");

  const submitData = async (data: FieldValues) => {
    const priceInNum = parseInt(price);
    let images;

    if (!propertyType) {
      setOtherError({
        ...otherError,
        property_type: "Please choose Property Type",
      });
      return;
    }
    if (priceInNum < 100) {
      setOtherError({ ...otherError, price: "Minimum price can be ₹100" });
      return;
    }
    if (files.length < 5) {
      setOtherError({ ...otherError, files: "Atleast 5 photos are required" });
      return;
    } else {
      setIsLoading(true);
      images = await handleUpload();
    }

    const payload: RegisterationPayload = {
      hostId: "665422af8921d3c5d2baddee",
      details: {
        name: data.title,
        description: data.description,
      },
      address: { full: data.address },
      price: {
        original_price: priceInNum,
      },
      property_type: propertyType,
      email: data.email,
      images: images,
    };
    // console.log(payload);
    try {
      const response = await apiClient.post<RegisterationPayload>(payload);
      toast({
        title: "Success",
        description: response.message,
        status: "success",
      });
      setIsLoading(false);
      onNext();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast({
          title: "Failed",
          description: err.response?.data.error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // console.log(err.response);
      }
      setIsLoading(false);
    }
  };

  // const handleUpload = async () => {
  //   const images: Images[] = [];

  //   files.forEach((file) => {
  //     const storageRef = ref(storage, `houses/${file.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const percentage =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log(`File ${file.name} uploaded: ${percentage.toFixed(0)}%`);
  //       },
  //       (error) => {
  //         toast({
  //           title: "Upload failed",
  //           description: error.message,
  //           status: "error",
  //           duration: 9000,
  //           isClosable: true,
  //         });
  //         console.error(`Error uploading ${file.name}:`, error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           images.push({ src: downloadURL });
  //           console.log(`File ${file.name} available at:`, downloadURL);
  //         });
  //       }
  //     );
  //   });

  //   return images;
  //   // toast({
  //   //   title: "All files uploaded successfully!",
  //   //   status: "success",
  //   //   duration: 3000,
  //   //   isClosable: true,
  //   // });

  //   // onNext();
  // };

  const handleUpload = async () => {
    const uploadPromises = files.map((file) => {
      const storageRef = ref(storage, `houses/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<Images>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(
              `File ${file.name} uploaded: ${percentage.toFixed(0)}%`
            );
          },
          (error) => {
            toast({
              title: "Upload failed",
              description: error.message,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            console.error(`Error uploading ${file.name}:`, error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(`File ${file.name} available at:`, downloadURL);
              resolve({ src: downloadURL });
            });
          }
        );
      });
    });

    const images: Images[] = await Promise.all(uploadPromises);
    toast({
      title: "All files uploaded successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    return images;
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <>
      {/* <AddPropertyHeader /> */}
      <Stack paddingX={40} marginBottom={40} marginTop={10}>
        <Heading display={"flex"} flexWrap={"wrap"}>
          Add Property on{" "}
          <Text marginLeft={2} color={"red.300"}>
            HouseHotel
          </Text>
        </Heading>
        <FormControl marginY={10} isRequired>
          <FormLabel htmlFor="title" fontSize={"lg"} fontWeight={"600"}>
            Title
          </FormLabel>
          <Input
            id="title"
            type="text"
            placeholder="eg. Brad Hotels"
            paddingY={7}
            {...register("title")}
          />
          {errors.title && (
            <FormHelperText color="red.500">
              {errors.title.message}
            </FormHelperText>
          )}
          <FormHelperText>
            Make sure this matches the name on your property papers. If you go
            by another name, you can add a preferred title.
          </FormHelperText>
        </FormControl>

        <FormControl marginY={10} isRequired>
          <FormLabel htmlFor="description" fontSize={"lg"} fontWeight={"600"}>
            Description
          </FormLabel>
          <Input
            id="description"
            type="text"
            placeholder="Description here"
            paddingY={7}
            {...register("description")}
          />
          {errors.description && (
            <FormHelperText color="red.500">
              {errors.description.message}
            </FormHelperText>
          )}
          <FormHelperText>
            Give a short description of Your property that people might be
            interested in.
          </FormHelperText>
        </FormControl>

        <FormControl marginY={10} isRequired>
          <FormLabel htmlFor="address" fontSize={"lg"} fontWeight={"600"}>
            Address
          </FormLabel>
          <Input
            id="address"
            type="text"
            placeholder="eg. Krishna nagar, Mathura"
            paddingY={7}
            {...register("address")}
          />
          {errors.address && (
            <FormHelperText color="red.500">
              {errors.address.message}
            </FormHelperText>
          )}
          <FormHelperText>
            Provide full address of your property. Make sure to give same
            address as on the documents.
          </FormHelperText>
        </FormControl>

        <FormControl marginY={10}>
          <FormLabel htmlFor="price" fontSize={"lg"} fontWeight={"600"}>
            Price
          </FormLabel>
          {/* <Input
            id="price"
            type="number"
            placeholder="price"
            {...register("price")}
          /> */}
          {/* <PriceInput id="price" name="price" control={control} /> */}
          {/* <Controller
            name={"price"}
            control={control}
            render={({ field }) => ( */}
          <NumberInput
            // {...field}
            onChange={(valueString) => setPrice(parse(valueString))}
            value={format(price)}
            min={100}
            step={500}
            precision={2}
            focusBorderColor="black"
            id={"price"}
            allowMouseWheel
          >
            <NumberInputField padding={7} fontWeight={600} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {/* )}
          /> */}
          {otherError.price && (
            <FormHelperText color="red.500">{otherError.price}</FormHelperText>
          )}
        </FormControl>

        <FormControl marginY={10} isRequired>
          <FormLabel htmlFor="email" fontSize={"lg"} fontWeight={"600"}>
            Contact info
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <FormHelperText color="red.500">
              {errors.email.message}
            </FormHelperText>
          )}
          <FormHelperText>
            We'll email you trip confirmations and receipts.
          </FormHelperText>
        </FormControl>

        <FormControl marginY={10} isRequired>
          <FormLabel htmlFor="property_type" fontSize={"lg"} fontWeight={"600"}>
            Propery Type
          </FormLabel>
          {/* <Input
            id="property_type"
            type="text"
            placeholder="property_type"
            {...register("property_type")}
          /> */}
          {/* <Controller
            render={({ field }) => ( */}
          <RadioGroup
            // {...field}
            onChange={(value) => setPropertyType(value)}
            value={propertyType}
            id="property_type"
            marginRight={10}
          >
            <Stack direction="row">
              <Box paddingX={5} paddingY={4} bg={"gray.50"} rounded={"lg"}>
                <Radio value="house">
                  <VStack marginX={5} fontSize={"xl"}>
                    <FaHouse />
                    <Text>House</Text>
                  </VStack>
                </Radio>
              </Box>
              <Box paddingX={5} paddingY={4} bg={"gray.50"} rounded={"lg"}>
                <Radio value="room">
                  <VStack marginX={5} fontSize={"xl"}>
                    <HiMiniHomeModern />
                    <Text>Room</Text>
                  </VStack>
                </Radio>
              </Box>
              <Box paddingX={5} paddingY={4} bg={"gray.50"} rounded={"lg"}>
                <Radio value="flat">
                  <VStack marginX={5} fontSize={"xl"}>
                    <MdApartment />
                    <Text>Flat</Text>
                  </VStack>
                </Radio>
              </Box>
            </Stack>
          </RadioGroup>
          {/* )}
            name="property_type"
            control={control}
          /> */}
          {otherError.property_type && (
            <FormHelperText color="red.500">
              {otherError.property_type}
            </FormHelperText>
          )}
          <FormHelperText>
            What type of property do you wanna list at HouseHotel.
          </FormHelperText>
        </FormControl>

        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"lg"} fontWeight={"600"}>
              Upload Image
            </FormLabel>
            <ImageUploader
              files={files}
              onSetFiles={(files) => setFiles(files)}
              w={"100%"}
            />
            {files.length !== 0 && (
              <Text fontSize={"lg"} fontWeight={"600"} marginY={3}>
                Image Preview
              </Text>
            )}
            <Flex flexWrap={"wrap"}>
              {files.map((file, index) => (
                <Box
                  key={index}
                  overflow="hidden"
                  margin={2}
                  position={"relative"}
                >
                  <Image
                    borderRadius="lg"
                    src={URL.createObjectURL(file)}
                    alt={`image-${index}`}
                    height="200px"
                    mb={2}
                  />
                  <Button
                    onClick={() => removeImage(index)}
                    position={"absolute"}
                    right={0}
                    top={0}
                    variant={"none"}
                    borderRadius={"50%"}
                  >
                    <IoCloseCircleSharp />
                  </Button>
                </Box>
              ))}
            </Flex>
            {otherError.files && (
              <FormHelperText color="red.500">
                {otherError.files}
              </FormHelperText>
            )}
          </FormControl>
        </VStack>

        <Center flexDirection={"column"}>
          <Text fontSize={"xs"} color="gray.700" marginY={3}>
            By selecting <strong>Agree and continue</strong>, I agree to
            HouseHotel’s
            <Link
              as={ReactRouterLink}
              textDecoration={"underline"}
              color={"blue.500"}
            >
              Terms of Service, Payments Terms of Service
            </Link>
            , and{" "}
            <Link
              as={ReactRouterLink}
              textDecoration={"underline"}
              color={"blue.500"}
            >
              Nondiscrimination Policy
            </Link>{" "}
            and acknowledge the{" "}
            <Link
              as={ReactRouterLink}
              textDecoration={"underline"}
              color={"blue.500"}
            >
              Privacy Policy
            </Link>
            .
          </Text>
          <GradientButton
            text={"Submit"}
            width={"lg"}
            paddingY={6}
            marginY={10}
            onClick={handleSubmit(submitData)}
            isLoading={isLoading}
          />
        </Center>
      </Stack>
      <HStack
        width={"100%"}
        justifyContent={"space-between"}
        bg={"gray.50"}
        padding={5}
        position={"fixed"}
        bottom={0}
      >
        <Button variant={"outline"} onClick={onBack}>
          Back{" "}
        </Button>
        <div></div>
      </HStack>
    </>
  );
};

export default PropertyForm;
