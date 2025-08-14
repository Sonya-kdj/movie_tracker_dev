import { IsEnum, IsInt, isInt, IsOptional, Max, Min } from 'class-validator'
import { WatchStatus } from '../enums/WatchStatus'

export class AddUserMovieDto {
	@IsInt() kdId!: number
	@IsEnum(['movie', 'serial'] as any) type!: 'movie' | 'serial'
	@IsOptional() @IsInt() year?: number
	@IsOptional() title?: string
	@IsOptional() posterUrl?: string
	@IsOptional() description?: string
	@IsOptional() @IsEnum(WatchStatus) status!: WatchStatus
	@IsOptional() @IsInt() @Min(1) @Max(10) rating?: number
}

export class UpdateUserMovieDto {
	@IsOptional() @IsEnum(WatchStatus) status?: WatchStatus
	@IsOptional() @IsInt() @Min(1) @Max(10) rating?: number
}
